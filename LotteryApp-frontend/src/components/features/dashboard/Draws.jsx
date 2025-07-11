import React from 'react'

const drawsData = [
  {
    usuario: 'JJSB',
    wallet: '26547890',
    transaction: '322468768',
    hora: '17:14',
    fecha: '28/06/25',
    boleto: '1234567',
    adicional: 8,
    total: 1.75,
    usdt: '',
    mxn: ''
  },
  {
    usuario: 'JJSB',
    wallet: '26547890',
    transaction: '425157896',
    hora: '17:16',
    fecha: '28/06/25',
    boleto: '9874563',
    adicional: '',
    total: 1.4,
    usdt: '',
    mxn: ''
  },
  {
    usuario: 'JJSB',
    wallet: '26547890',
    transaction: '211558726',
    hora: '17:21',
    fecha: '28/06/25',
    boleto: '2459703',
    adicional: 6,
    total: 1.75,
    usdt: '',
    mxn: ''
  },
  {
    usuario: 'JJSB',
    wallet: '26547890',
    transaction: '124563259',
    hora: '17:32',
    fecha: '28/06/25',
    boleto: '3485760',
    adicional: '',
    total: 1.4,
    usdt: '',
    mxn: ''
  }
]

const columns = [
  'Transaction',
  'Hora',
  'Fecha',
  'Boleto',
  'Adicional',
  'Total',
  'USDT',
  'Mx. Pesos'
]

const Draws = () => {
  return (
    <div className="p-4 h-screen">
      <div className='bg-amber-100 py-2'>
        <h1 className='text-5xl font- font-bold'> Draws</h1>
      </div>

      {/* Table for sm and up */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg bg-white text-gray-900 text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 border border-gray-300 font-semibold text-center"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drawsData.map((row, idx) => (
              <tr key={idx} className="hover:bg-yellow-50 transition">
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.transaction}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.hora}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.fecha}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.boleto}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.adicional}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.total}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.usdt}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center">
                  {row.mxn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for xs screens */}
      <div className="sm:hidden flex flex-col gap-4 w-full">
        {drawsData.map((row, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-300 rounded-lg shadow p-3 text-xs"
          >
            {columns.map((col, i) => (
              <div
                key={col}
                className="flex justify-between py-1 border-b last:border-b-0"
              >
                <span className="font-semibold text-gray-700">{col}:</span>
                <span className="text-gray-900 ml-2">
                  {row[
                    [
                      'usuario',
                      'wallet',
                      'transaction',
                      'hora',
                      'fecha',
                      'boleto',
                      'adicional',
                      'total',
                      'usdt',
                      'mxn'
                    ][i]
                  ] || <span className="text-gray-400">-</span>}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Draws
