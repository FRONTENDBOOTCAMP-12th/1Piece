import { IoCheckmark } from 'react-icons/io5';

function RadioIcon() {
  return (
    <div
      style={{
        background: `var(--dark-gray-g)`,
        display: 'inline-flex',
        borderRadius: `var(--rounded-full)`,
        padding: `var(--space-2)`,
        border: `2px solid var(--black)`,
      }}
    >
      <IoCheckmark size={40} />
    </div>
  );
}

export default RadioIcon;
