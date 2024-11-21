import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ISuperheroFields,
  validationSuperheroSchema,
} from '../../validations/validations';
import { Input } from '../shared/Input';
import Button from '../shared/Button';
import ImageUpload from './ImageUpload';
import { useState } from 'react';
import { IImage, ISuperhero } from '../../types/ISuperhero';
import SuperheroService from '../../api/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ISuperheroFormProps {
  defaultValues?: ISuperhero;
  edit?: boolean;
  refetch?: () => void;
  close?: () => void;
}

const SuperheroForm: React.FC<ISuperheroFormProps> = ({
  defaultValues,
  edit,
  refetch,
  close,
}) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [existingImages, setExistingImages] = useState<IImage[] | []>(
    defaultValues?.images || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ISuperheroFields>({
    resolver: yupResolver(validationSuperheroSchema, {
      context: { uploadedImages, existingImages, imagesToDelete },
    }),
    defaultValues,
  });

  async function superhero(formData: FormData): Promise<any> {
    if (edit && defaultValues?.id) {
      return SuperheroService.editSuperhero(defaultValues.id, formData);
    }
    return SuperheroService.createSuperhero(formData);
  }

  const mutation = useMutation({
    mutationFn: superhero,
    onSuccess: () => {
      toast.success(
        edit
          ? 'Superhero updated successfully!'
          : 'Superhero created successfully!'
      );
      if (refetch) refetch();
      if (close) close();
      reset();
      setUploadedImages([]);
      setImagesToDelete([]);
      setExistingImages([]);
    },
    onError: (error: any) => {
      toast.error('Something went wrong. Please try again!');
      console.error('Error during mutation:', error);
    },
  });

  const onSubmit: SubmitHandler<ISuperheroFields> = async (data) => {
    if (
      existingImages.length === 0 &&
      uploadedImages.length === 0 &&
      imagesToDelete.length > 0
    ) {
      setError('images', {
        type: 'manual',
        message: 'At least one image is required.',
      });
      return;
    }
    const formData = new FormData();
    formData.set('nickname', data.nickname as string);
    formData.set('realName', data.realName as string);
    formData.set('originDespription', data.originDespription as string);
    formData.set('superpowers', data.superpowers as string);
    formData.set('catchPhrase', data.catchPhrase as string);
    if (uploadedImages.length > 0) {
      uploadedImages.forEach((imgFile) => formData.append('images', imgFile));
    }

    if (imagesToDelete.length > 0) {
      formData.set('imageIdsToDelete', JSON.stringify(imagesToDelete));
    }

    mutation.mutate(formData);
  };

  const handleImagesUpload = (files: File[]) => {
    const updatedImages = [...uploadedImages, ...files];
    setUploadedImages(updatedImages);
    setValue('images', updatedImages);
    if (updatedImages.length > 0) {
      clearErrors('images');
    }
  };

  const handleImageDelete = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      const updatedExistingImages = [...existingImages];
      const [deletedImage] = updatedExistingImages.splice(index, 1);
      setExistingImages(updatedExistingImages);
      setImagesToDelete((prev) => [...prev, deletedImage.id]);
    } else {
      const updatedUploadedImages = [...uploadedImages];
      updatedUploadedImages.splice(index, 1);
      setUploadedImages(updatedUploadedImages);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={'flex gap-8'}>
        <div className={'flex flex-col gap-2 w-[500px]'}>
          <Input
            id="nickname"
            label="Nickname"
            placeholder="Spiderman"
            register={register('nickname')}
            error={errors.nickname}
            type="text"
            required
          />
          <Input
            id="realName"
            label="Real name"
            placeholder="Peter Parker"
            register={register('realName')}
            error={errors.realName}
            type="text"
            required
          />
          <Input
            id="originDescription"
            label="Origin Description"
            placeholder="Bitten by a radioacti..."
            register={register('originDespription')}
            error={errors.originDespription}
            type="text"
            isTextArea
            required
          />
          <Input
            id="superpowers"
            label="Superpowers"
            placeholder="Wall-crawling, enhanced..."
            register={register('superpowers')}
            error={errors.superpowers}
            type="text"
            isTextArea
            required
          />
          <Input
            id="catchPhrase"
            label="Catch phrase"
            placeholder="Your friendly neighborhood..."
            register={register('catchPhrase')}
            error={errors.catchPhrase}
            type="text"
            isTextArea
            required
          />
          <Button
            text={
              mutation.isPending
                ? 'Sending...'
                : edit
                ? 'Edit Superhero'
                : 'Create Superhero'
            }
            variant="primary"
            type="submit"
            disabled={mutation.isPending}
          />
        </div>

        <div className="w-[500px]">
          <ImageUpload
            onImagesUpload={handleImagesUpload}
            uploadedImages={uploadedImages}
            existingImages={existingImages}
            onImageDelete={handleImageDelete}
            errors={errors.images?.message}
          />
        </div>
      </div>
    </form>
  );
};

export default SuperheroForm;
