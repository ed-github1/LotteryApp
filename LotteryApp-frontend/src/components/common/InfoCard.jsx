const InfoCard = ({ 
  label, 
  value, 
  editMode, 
  register, 
  name, 
  validation, 
  error, 
  disabled = false,
  autoComplete,
  icon 
}) => {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-yellow-300">{icon}</span>}
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
          {label}
        </span>
      </div>
      
      {editMode ? (
        <div>
          <input
            {...register(name, validation)}
            className={`w-full bg-transparent border-b-2 border-yellow-300/50 focus:border-yellow-300 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors duration-200 ${
              error ? 'border-red-400 focus:border-red-400' : ''
            }`}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid={!!error}
          />
          {error && (
            <p className="mt-1 text-xs text-red-400">{error.message}</p>
          )}
        </div>
      ) : (
        <span className="font-semibold text-white text-lg">
          {value || 'Not provided'}
        </span>
      )}
    </div>
  );
};

export default InfoCard;
