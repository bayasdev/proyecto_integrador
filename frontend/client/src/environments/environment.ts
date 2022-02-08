// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
