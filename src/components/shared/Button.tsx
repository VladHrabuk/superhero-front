interface IButton {
  variant?: 'default' | 'primary' | 'destructive';
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isIconOnly?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IButton> = ({
  variant = 'default',
  icon,
  text,
  onClick,
  isIconOnly,
  disabled,
  type,
}) => {
  let bgColorClass, textColorClass;

  switch (variant) {
    case 'primary':
      bgColorClass = 'bg-green hover:bg-green-dark';
      textColorClass = 'text-white';
      break;
    case 'destructive':
      bgColorClass = 'bg-red-100 text-red-600 hover:bg-red-300';
      break;
    default:
      bgColorClass = 'bg-gray-100 hover:bg-gray-300';
      break;
  }

  const buttonClasses = `flex flex-col items-center justify-between p-2 rounded-lg text-sm font-medium  ${bgColorClass} ${textColorClass}`;

  const renderContent = () => {
    if (isIconOnly) {
      return <div>{icon}</div>;
    } else if (icon && text) {
      return (
        <div className="flex flex-row items-center justify-between gap-3 px-4">
          {text}
          {icon}
        </div>
      );
    } else {
      return <div className="px-4">{text}</div>;
    }
  };

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
