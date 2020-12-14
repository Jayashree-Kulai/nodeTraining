define({ "api": [
  {
    "type": "post",
    "url": "/questionnaires/addQuestionnaire",
    "title": "Add Questionnaire",
    "name": "Add_Questionnaire",
    "group": "Questionnaire",
    "description": "<p>API for adding a questionnaire.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Questionnaire title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Questionnaire description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buttonTitle",
            "description": "<p>Button Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buttonText",
            "description": "<p>Button Text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "checkBoxText",
            "description": "<p>CheckBox Text</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start Date (Example : &quot;2020-12-09&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>End Date (Example : &quot;2020-12-09&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "reminder",
            "description": "<p>Auto reminder</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pptFile",
            "description": "<p>PPT file with content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "excelSheet",
            "description": "<p>Excel sheet containing end user details</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailBody",
            "description": "<p>Mail Body</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/questionnaires/addQuestionnaire",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/questionnaires/addQuestionnaire"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T08:53:04.161Z\"\n    },\n    \"pagination\": {},\n    \"{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T10:07:23.833Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"_id\": \"5fd1f35be392204295efaeaf\",\n        \"adminId\": \"5fd1e1669b7243379e261fc3\",\n        \"title\": \"Leave policy\",\n        \"description\": \"Leave policy details\",\n        \"buttonTitle\": \"Accept\",\n        \"buttonText\": \"I Agree\",\n        \"checkBoxText\": \"I Agree\",\n        \"startDate\": \"2020-12-09T00:00:00.000Z\",\n        \"endDate\": \"2020-12-10T00:00:00.000Z\",\n        \"reminder\": 2,\n        \"pptFile\": \"/home/jayashree/server-policy-app/api/uploads/abc.ppt\",\n        \"excelSheet\": \"endUser.xlsx\",\n        \"mailBody\": \"Hi Please read and accept this policy\",\n        \"createdAt\": \"2020-12-10T10:07:23.825Z\",\n        \"updatedAt\": \"2020-12-10T10:07:23.825Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 409 Conflict\n  {\n    \"meta\": {\n        \"code\": 409,\n        \"message\": \"Data exists\",\n        \"timestamp\": \"2020-12-10T10:02:45.911Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/questionnaire.js",
    "groupTitle": "Questionnaire",
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
    "url": "/questionnaireAgreementStatus/acceptPolicy",
    "title": "Update PolicyStatus",
    "name": "Update_PolicyStatus",
    "group": "QuestionnaireAgreementStatus",
    "description": "<p>API to Update PolicyAgreementStatus</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionnaireId",
            "description": "<p>questionnaire Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"questionnaireId\":\"5fd1e62b4cd3c851bd15c2d6\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/questionnaireAgreementStatus/acceptPolicy",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/questionnaireAgreementStatus/acceptPolicy"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"meta\": {\n    \"code\": 200,\n    \"message\": \"Success\",\n    \"timestamp\": \"2020-11-12T04:47:52.234Z\"\n    },\n    \"pagination\": {},\n        \"data\": {\n        \"agreed\": true,\n        \"_id\": \"5fd1a52a5905f31791aabd85\",\n        \"userId\": \"5fd1a52a5905f31791aabd83\",\n        \"questionnaireId\": \"5fd1852a2c38f10bb8597949\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"meta\": {\n        \"code\": 404,\n        \"message\": \"No Records Found\",\n        \"timestamp\": \"2020-12-10T12:07:03.917Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/questionnaireAgreementStatus.js",
    "groupTitle": "QuestionnaireAgreementStatus",
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
    "type": "get",
    "url": "/questionnaires/generateReportQuestionnaire",
    "title": "Generate Report",
    "name": "Generate_Report",
    "group": "Questionnaire",
    "description": "<p>API for generating questionnaire report.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/questionnaires/generateReportQuestionnaire",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/questionnaires/generateReportQuestionnaire"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{ \n        Report will be downloaded.\n    }",
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
    "filename": "routes/questionnaire.js",
    "groupTitle": "Questionnaire",
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
    "url": "/questionnaires/previewQuestionnaire",
    "title": "Preview Questionnaire",
    "name": "Preview_Questionnaire",
    "group": "Questionnaire",
    "description": "<p>API for preview questionnaire</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionnaireId",
            "description": "<p>Questionnaire Id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/questionnaires/previewQuestionnaire",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/questionnaires/previewQuestionnaire"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-10T10:49:49.199Z\"\n    },\n    \"pagination\": {},\n    \"data\": {\n        \"_id\": \"5fd1f35be392204295efaeaf\",\n        \"adminId\": \"5fd1e1669b7243379e261fc3\",\n        \"title\": \"Leave policy\",\n        \"description\": \"Leave policy details\",\n        \"buttonTitle\": \"Accept\",\n        \"buttonText\": \"I Agree\",\n        \"checkBoxText\": \"I Agree\",\n        \"startDate\": \"2020-12-09T00:00:00.000Z\",\n        \"endDate\": \"2020-12-10T00:00:00.000Z\",\n        \"reminder\": 2,\n        \"pptFile\": \"/home/jayashree/server-policy-app/api/uploads/abc.ppt\",\n        \"excelSheet\": \"endUser.xlsx\",\n        \"mailBody\": \"Hi Please read and accept this policy\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 409 Conflict\n  {\n    \"meta\": {\n        \"code\": 400,\n        \"message\": \"Required Parameter missing\",\n        \"timestamp\": \"2020-12-10T10:57:06.922Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/questionnaire.js",
    "groupTitle": "Questionnaire",
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
    "url": "/questionnaires/publishQuestionnaire",
    "title": "Publish Questionnaire",
    "name": "Publish_Questionnaire",
    "group": "Questionnaire",
    "description": "<p>API for publish a questionnaire.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionnaireId",
            "description": "<p>Questionnaire Id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/questionnaires/publishQuestionnaire",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/questionnaires/publishQuestionnaire"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{ \n        No data as response, Mail will be sent to end users.\n    }",
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
    "filename": "routes/questionnaire.js",
    "groupTitle": "Questionnaire",
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
    "type": "get",
    "url": "/users/getPendingAgreements",
    "title": "Get pending agreements",
    "name": "Get_pending_agreements",
    "group": "User",
    "description": "<p>API for getting pending agreements of specific user</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/getPendingAgreements",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/getPendingAgreements"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"meta\": {\n        \"code\": 200,\n        \"message\": \"Success\",\n        \"timestamp\": \"2020-12-14T10:27:57.077Z\"\n    },\n    \"pagination\": {},\n    \"data\": [\n        {\n            \"_id\": \"5fd353c75202d54111eaa140\",\n            \"agreed\": false,\n            \"userId\": {\n                \"_id\": \"5fd20978eff7064e5ef86f27\",\n                \"mailId\": \"jayashree.cs16@sahyadri.edu.in\",\n                \"name\": \"Jayashree\",\n                \"employeeCode\": \"MNG003\"\n            },\n            \"questionnaireId\": \"5fd20836d7c9764d8df81ad2\"\n        },\n        {\n            \"_id\": \"5fd73b547f6f879badea3927\",\n            \"agreed\": false,\n            \"userId\": {\n                \"_id\": \"5fd20978eff7064e5ef86f27\",\n                \"mailId\": \"jayashree.cs16@sahyadri.edu.in\",\n                \"name\": \"Jayashree\",\n                \"employeeCode\": \"MNG003\"\n            },\n            \"questionnaireId\": \"5fd20836d7c9764d8df81ad2\"\n        }\n    ]\n   }",
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
  },
  {
    "type": "post",
    "url": "/users/addEndUsers",
    "title": "Upload excel sheet",
    "name": "Upload_excel_sheet",
    "group": "User",
    "description": "<p>API for uploading end users excel sheet. User data will be added to 'users' collection and credentials wil be mailed to users. This API can't be used in apidoc, since it has uploading file.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xlsheet",
            "description": "<p>excelSheet.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:4200/api/v1/users/addEndUsers",
        "type": "curl"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:4200/api/v1/users/addEndUsers"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n      {\nNo data as response...  Excel sheet will be uploaded to 'uploads' folder.\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"meta\": {\n        \"code\": 400,\n        \"message\": \"User does not exist\",\n        \"timestamp\": \"2020-12-10T06:23:37.168Z\"\n    }\n}",
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
