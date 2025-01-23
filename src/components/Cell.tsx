interface CellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function Cell({ value, isInitial, isSelected, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 flex items-center justify-center text-lg font-medium
        ${isInitial ? 'font-bold' : 'text-blue-600'}
        ${isSelected ? 'bg-blue-100' : 'bg-white'}
        ${(value === 0) ? '' : ''}
        hover:bg-blue-50 transition-colors
        border-r border-b border-gray-200
        ${[2, 5].includes(Math.floor(parseInt(onClick.toString().split(',')[0]) % 9)) ? 'border-r-2 border-r-gray-400' : ''}
        ${[2, 5].includes(Math.floor(parseInt(onClick.toString().split(',')[1]) % 9)) ? 'border-b-2 border-b-gray-400' : ''}
      `}
    >
      {value !== 0 ? value : ''}
    </button>
  );
}
