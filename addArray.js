const arr = [
  [
    {
      displayName: {
        EN: "test 1",
        NL: "1 NL",
      },
      sorting: 1,
      id: "stockPointG4A62Fd",
      products: [
        {
          container6eERWRV: {
            label: "product 23",
            id: "container6eERWRV",
          },
        },
        {
          containeroNIzSQi: {
            label: "test product 1",
            id: "containeroNIzSQi",
          },
        },
      ],
    },
  ],
  [
    {
      displayName: {
        EN: "Stockpoint3",
        NL: "Stockping3NL",
      },
      sorting: 3,
      id: "stockPointZGHi3xo",
    },
  ],
  [
    {
      sorting: 2,
      displayName: {
        EN: "test 223",
        NL: "2 NL",
      },
      id: "stockPointyW6QbBn",
    },
  ],
];

console.log(arr.flat());
