define({ "api": [
  {
    "type": "post",
    "url": "/users/addAdmin",
    "title": "Add Admin",
    "name": "Add_Admin",
    "group": "User",
    "description": "<p>API for adding an admin.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Admin name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeCode",
            "description": "<p>Admin employeeCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Admin mailId</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/addAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/addAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T08:53:04.161Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": true,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd1e1f038573738947ee16c\",\n        \"name\": \"Prabhakara\",\n        \"employeeCode\": \"MNG01\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"password\": \"18d744ceed51cd2ab9f2118157ae0779bd3bf1ea\",\n        \"createdAt\": \"2020-12-10T08:53:04.079Z\",\n        \"updatedAt\": \"2020-12-10T08:53:04.079Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/addSuperAdmin",
    "title": "Add Super Admin",
    "name": "Add_Super_Admin",
    "group": "User",
    "description": "<p>API for adding a super admin.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Super admin name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeCode",
            "description": "<p>Super admin employeeCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Super admin mailId</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/addSuperAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/addSuperAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T08:53:04.161Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": true,\n        \"_id\": \"5fd1e1f038573738947ee16c\",\n        \"name\": \"Prabhakara\",\n        \"employeeCode\": \"MNG01\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"password\": \"18d744ceed51cd2ab9f2118157ae0779bd3bf1ea\",\n        \"createdAt\": \"2020-12-10T08:53:04.079Z\",\n        \"updatedAt\": \"2020-12-10T08:53:04.079Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/users/changePassword",
    "title": "Change Password",
    "name": "Change_Password",
    "group": "User",
    "description": "<p>API for changing password, after login.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"password\" : \"sderty\"\n}",
          "type": "json"
        },
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/changePassword",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/changePassword"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T07:45:48.118Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd1cdff8f2afa2f8853f98b\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Anugraha\",\n        \"employeeCode\": \"MNG001\",\n        \"token\": \"644bc2d8-8df7-4f98-9abe-417223bca558\",\n        \"tokenExpiry\": \"2020-12-10T08:44:58.422Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n{\n    \"meta\": {\n        \"code\": 400,\n        \"timestamp\": \"2020-12-10T08:02:43.345Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/deleteAdmin",
    "title": "Delete Admin",
    "name": "Delete_Admin",
    "group": "User",
    "description": "<p>API for deleting an admin. It will update 'isAdmin' field of the 'users' collection as 'false'.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Admin mailId, the one, which has to be deleted</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/deleteAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/deleteAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T09:32:33.946Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd1e1669b7243379e261fc4\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Anugraha\",\n        \"employeeCode\": \"MNG001\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/users/deleteSuperAdmin",
    "title": "Delete Super Admin",
    "name": "Delete_Super_Admin",
    "group": "User",
    "description": "<p>API for deleting a super admin. It will update 'isSuperAdmin' field of the 'users' collection as 'false'.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Super admin mailId, the one, which has to be deleted</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/deleteSuperAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/deleteSuperAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T09:19:13.737Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd1e1669b7243379e261fc4\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Anugraha\",\n        \"employeeCode\": \"MNG001\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "description": "<p>API for user login</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the corresponding user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"name\": \"Yakshitha\",\n  \"password\" : \"qwertyy\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/login",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/login"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n      {\n         \"meta\": {\n         \"code\": 200,\n         \"message\": \"Success\",\n         \"timestamp\": \"2020-12-09T18:47:40.498Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": true,\n        \"_id\": \"5fd10b90a0c55d11812a548b\",\n        \"name\": \"Yakshitha\",\n        \"employeeCode\": \"MNG01\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"token\": \"15c6aaad-9614-42e3-9c0d-a8ce9ed974e4\",\n        \"tokenExpiry\": \"2020-12-09T19:47:40.478Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"meta\": {\n        \"code\": 400,\n        \"message\": \"User does not exist\",\n        \"timestamp\": \"2020-12-10T06:23:37.168Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "User",
    "description": "<p>API for user logout</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/logout",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/logout"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T07:18:22.935Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd10ac3e307ae109300ff2a\",\n        \"IsAdmin\": true,\n        \"IsSuperAdmin\": false,\n        \"name\": \"Yakshitha\",\n        \"employeeCode\": \"MNG01\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"token\": null,\n        \"tokenExpiry\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/users/updateAdmin",
    "title": "Update Admin",
    "name": "Update_Admin",
    "group": "User",
    "description": "<p>API for updating an admin 'name' and 'employeeCode'.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Admin name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeCode",
            "description": "<p>Admin employeeCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Admin mailId (Can't be changed)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/updateAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/updateAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T09:43:36.839Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": true,\n        \"isSuperAdmin\": false,\n        \"_id\": \"5fd1e1669b7243379e261fc4\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Namitha\",\n        \"employeeCode\": \"MNG100\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/sendPasswordUpdateLink",
    "title": "Send Password Updation Link",
    "name": "Update_Password",
    "group": "User",
    "description": "<p>API for sending password updation link, The mailId linked with the 'name' will get the password updation link.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"name\": \"Anugraha\"   \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/sendPasswordUpdateLink",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/sendPasswordUpdateLink"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T07:30:51.939Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"_id\": \"5fd1cdff8f2afa2f8853f98b\",\n        \"isAdmin\": false,\n        \"isSuperAdmin\": false,\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Anugraha\",\n        \"employeeCode\": \"MNG001\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n{\n    \"meta\": {\n        \"code\": 400,\n        \"message\": \"Required Parameter missing\",\n        \"timestamp\": \"2020-12-10T07:34:01.066Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/updateSuperAdmin",
    "title": "Update Super Admin",
    "name": "Update_Super_Admin",
    "group": "User",
    "description": "<p>API for updating a super admin 'name' and 'employeeCode'.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Super admin name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeCode",
            "description": "<p>Super admin employeeCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailId",
            "description": "<p>Super admin mailId (Can't be changed)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/updateSuperAdmin",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/updateSuperAdmin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T09:43:36.839Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"isAdmin\": false,\n        \"isSuperAdmin\": true,\n        \"_id\": \"5fd1e1669b7243379e261fc4\",\n        \"mailId\": \"anugrahakulai@gmail.com\",\n        \"name\": \"Namitha\",\n        \"employeeCode\": \"MNG100\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token for authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
