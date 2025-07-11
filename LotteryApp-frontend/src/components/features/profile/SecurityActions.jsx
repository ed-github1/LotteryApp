const SecurityActions = () => (
  <div className="bg-white shadow rounded-lg p-6 w-full">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Security</h2>
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
        Change Password
      </button>
      <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Log Out
      </button>
    </div>
  </div>
)

export default SecurityActions