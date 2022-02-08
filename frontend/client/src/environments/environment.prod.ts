export const environment = {
  production: true,
  api: 'https://smcar.bayas.dev:8443/api/v2/',
  request_types: [
    {
      id: 1,
      name: 'Modificación de Carga Académica'
    },
    {
      id: 2,
      name: 'Retiro en Asignatura'
    },
  ],
  request_statuses: [
    {
      id: 1,
      name: 'Pago Pendiente'
    },
    {
      id: 2,
      name: 'Pago Aprobado'
    },
    {
      id: 3,
      name: 'Pago Rechazado'
    },
    {
      id: 4,
      name: 'Aprobado por Director'
    },
    {
      id: 5,
      name: 'Rechazado por Director'
    },
    {
      id: 6,
      name: 'Aprobado por Decano'
    },
    {
      id: 7,
      name: 'Rechazado por Decano'
    },
  ],
  attachment_types: [
    {
      id: 1,
      name: 'Comprobante de Pago'
    },
    {
      id: 2,
      name: 'Otros'
    }
  ]
};
