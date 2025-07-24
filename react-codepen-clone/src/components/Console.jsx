import useStore from '../store/useStore';

const Console = () => {
  const { consoleOutput, clearConsoleOutput, isDarkMode } = useStore();

  const getMessageStyle = (level) => {
    switch (level) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      default:
        return isDarkMode ? 'text-gray-300' : 'text-gray-700';
    }
  };

  const getIconForLevel = (level) => {
    switch (level) {
      case 'error':
        return '❌';
      case 'warn':
        return '⚠️';
      default:
        return '💬';
    }
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Console Header */}
      <div className={`px-4 py-2 border-b flex justify-between items-center ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-gray-100 border-gray-300 text-gray-900'
      }`}>
        <h3 className="text-sm font-medium uppercase tracking-wide">
          Console ({consoleOutput.length})
        </h3>
        <button
          onClick={clearConsoleOutput}
          className={`px-2 py-1 text-xs rounded hover:opacity-80 transition-opacity ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Clear
        </button>
      </div>
      
      {/* Console Output */}
      <div className={`flex-1 overflow-auto p-4 font-mono text-sm ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {consoleOutput.length === 0 ? (
          <div className={`text-center py-8 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <div className="text-2xl mb-2">🔧</div>
            <p>Console output will appear here</p>
            <p className="text-xs mt-1">Try console.log() in your JavaScript</p>
          </div>
        ) : (
          <div className="space-y-1">
            {consoleOutput.map((output, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 py-1 px-2 rounded ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {getIconForLevel(output.level)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`break-words ${getMessageStyle(output.level)}`}>
                    {output.message}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {output.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;