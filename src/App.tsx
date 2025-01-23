import { Gamepad2 } from 'lucide-react';
import Board from './components/Board';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Sudoku Challenge</h1>
          </div>
          <p className="text-gray-600">Fill in the numbers 1-9 exactly once in every row, column, and 3x3 box</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6">
          <Board />
        </div>
      </div>
    </div>
  );
}
