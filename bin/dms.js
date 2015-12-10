#!/usr/local/bin/node

var program = require ('commander'),
    prettyjson = require('prettyjson'),
  _documentManager = require ('./../documentManager.js');


program.version('1.0.0');

/**
 * createUser from CLI module
 */
program
  .command ('createUser <firstName> <lastName> <userName> <email> <password> <role>')
  .action (function ( firstName, lastName, userName, email, password, role ) {
    _documentManager.createUser (firstName, lastName, userName, email, password, role);
  });

/**
 * createRole from CLI module
 */
program
  .command ('createRole <title>')
  .action (function ( title) {
    _documentManager.createRole (title);
  });

/**
 * createDocument from CLI module
 */
// program
//   .command ('createDocument <title> <content> <userName> <roles>')
//   .action (function ( title, content, userName, roles) {
//     _documentManager.createDocument (title, content, userName, roles);
//   });


/**
 * getAllUsers from CLI module
 */
program
  .command ('getAllUsers')
  .action (function () {
    _documentManager.getAllUsers (function (err, users) {
      if (err)
        throw err;
      console.log(JSON.stringify(users));
    });
  });

  /**
   * getAllRoles from CLI module
   */
program
  .command ('getAllRoles')
  .action ( function () {
    _documentManager.getAllRoles (function(err, roles){
      if (err)
        throw err;
      console.log(JSON.stringify(roles));
    });
  });

  /**
   * getAllDocuments from CLI module
   */
program
  .command ('getAllDocuments <limit>')
  .action ( function (limit) {
    _documentManager.getAllDocuments (limit);
});

/**
 * getAllDocumentsByRole from CLI module
 */
program
  .command ('getAllDocumentsByRole <role> <limit>')
  .action ( function (role, limit) {
    _documentManager.getAllDocumentsByRole (role, limit);
});

/**
 * getAllDocumentsByDate from CLI module
 */
program
  .command ('getAllDocumentsByDate <date> <limit>')
  .action ( function (date, limit) {
    _documentManager.getAllDocumentsByDate (date, limit);
});

program.parse(process.argv);
