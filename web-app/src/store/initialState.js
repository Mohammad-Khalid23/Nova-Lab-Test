let initialState = {

  auth: {
    user: null
  },
  loader: {
    requestInProgress: 0
  },
  users: {
    allusers: [
      {
        _id: 1,
        name: "user admin",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: true,
      },
      {
        _id: 2,
        name: "user admin 2",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },
      {
        _id: 3,
        name: "user admin 3",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },
      {
        _id: 4,
        name: "user admin 4",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
      },
      {
        _id: 5,
        name: "user admin 5",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },
      {
        _id: 6,
        name: "user admin 6",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },
      {
        _id: 7,
        name: "user admin 7",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },
      {
        _id: 8,
        name: "user admin 8",
        email: "admin@admin.com",
        role: "Admin",
        password: "admin123",
        active: false,
      },


    ],
    onlineUser: 0
  },
  events: [
    {
      _id: 1,
      name: "Event",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 2,
      name: "Event 2",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 3,
      name: "Event 3",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 4,
      name: "Event 4",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 5,
      name: "Event 5",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 6,
      name: "Event 6",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 7,
      name: "Event 7",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 8,
      name: "Event 8",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
  ],
  dashboard: {},
  emails: [],

};

export default initialState;
