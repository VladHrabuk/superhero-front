import { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SuperheroService from '../../api/api';
import { ISuperhero } from '../../types/ISuperhero';
import SuperheroForm from '../SuperheroForm/SuperheroForm';

interface SuperheroCardProps {
  superhero: ISuperhero;
}

const SuperheroCard: React.FC<SuperheroCardProps & { refetch: () => void }> = ({
  superhero,
  refetch,
}) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  const [viewIsOpen, setViewIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const toggleOpenDelete = () => {
    setDeleteIsOpen((value) => !value);
  };

  const toggleOpenEdit = () => {
    setEditIsOpen((value) => !value);
  };

  const toggleOpenView = () => {
    setViewIsOpen((value) => !value);
  };

  const handleDelete = useMutation({
    mutationFn: async (id: number) => {
      await SuperheroService.deleteSuperhero(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superheros'] });
      toggleOpenDelete();
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting superhero:', error);
    },
  });

  return (
    <>
      <div className="w-96 p-4 border rounded-2xl flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">{superhero.nickname}</h2>
            <div className="flex gap-3">
              <Button
                icon={<Eye size={16} />}
                isIconOnly
                variant="primary"
                onClick={toggleOpenView}
              />
              {viewIsOpen && (
                <Modal
                  title="View Superhero"
                  description={`Details of ${superhero.nickname}`}
                  onClose={toggleOpenView}
                >
                  <p className="text-base text-gray-600 mb-4">
                    <span className="text-xl text-green-300">Real Name:</span>{' '}
                    {superhero.realName}
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    <span className="text-xl text-green-300">
                      Origin Description:
                    </span>{' '}
                    {superhero.originDespription}
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    <span className="text-xl text-green-300">Superpowers:</span>{' '}
                    {superhero.superpowers}
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    <span className="text-xl text-green-300">
                      Catch Phrase:
                    </span>{' '}
                    {superhero.catchPhrase}
                  </p>
                  <div className="flex gap-4">
                    {superhero.images.map((img) => {
                      return (
                        <div key={img.id}>
                          <img
                            className="w-[150px] h-[200px] object-cover rounded-md"
                            src={img.url}
                            alt={superhero.nickname}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Modal>
              )}
              <Button
                icon={<Pencil size={16} />}
                isIconOnly
                onClick={toggleOpenEdit}
              />
              {editIsOpen && (
                <Modal
                  title="Edit Superhero"
                  description={`Edit details of ${superhero.nickname}`}
                  onClose={toggleOpenEdit}
                >
                  <SuperheroForm
                    defaultValues={superhero}
                    edit={true}
                    close={toggleOpenEdit}
                    refetch={refetch}
                  ></SuperheroForm>
                </Modal>
              )}

              <Button
                icon={<Trash2 size={16} />}
                isIconOnly
                variant="destructive"
                onClick={toggleOpenDelete}
              />
              {deleteIsOpen && (
                <Modal
                  title="Delete Superhero"
                  description={`Are you sure you want to delete ${superhero.nickname}?`}
                  onClose={toggleOpenDelete}
                >
                  <div>
                    <Button
                      text="Confirm Delete"
                      variant="primary"
                      onClick={() => handleDelete.mutate(superhero.id)}
                    />
                  </div>
                </Modal>
              )}
            </div>
          </div>
          <img
            src={superhero.images[0].url}
            className="w-[400px] h-[400px] object-cover"
            alt="superhero"
          />
        </div>
      </div>
    </>
  );
};

export default SuperheroCard;
