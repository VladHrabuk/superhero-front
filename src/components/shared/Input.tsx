import {
  FieldError,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface IInput {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  error?: FieldError;
  isTextArea?: boolean;
  style?: React.CSSProperties;
}

export const Input: React.FC<IInput> = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  required = false,
  error,
  isTextArea = false,
  style,
}) => {
  const inputClasses = `peer w-full p-2 font-light  bg-white  border-2 rounded-md outline-none transition
    ${error ? 'border-black' : 'border-gray-200'}
    ${error ? 'focus:border-red-600' : 'focus:border-black'}
    ${isTextArea ? 'h-24' : null}
  `;

  return (
    <div className="w-full relative text-sm">
      <label
        htmlFor={id}
        className={`text-black duration-300  p-1 transform rounded-md
          ${error ? 'text-red-600' : null}
        `}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          style={style}
          {...register}
          placeholder={placeholder}
          className={inputClasses}
          rows={8}
        />
      ) : (
        <input
          id={id}
          {...register}
          placeholder={placeholder}
          type={type}
          style={style}
          className={inputClasses}
        />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};
