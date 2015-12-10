(function() {
  'use strict';
})();

var _strftime = require ("strftime"),
	_models = require ("./models");

/**
 * [createUser: create/insert user into the database]
 * @param  {[string]} firstName [User's first name]
 * @param  {[string]} lastName  [User's last name]
 * @param  {[string]} userName  [User's userName]
 * @param  {[string]} email     [User's email]
 * @param  {[string]} password  [User's password]
 * @param  {[string]} role      [User's role]
 * @return {[string]}   Successfully created user        [User successfully created/inserted into the database]
 */
var createUser = function (firstName, lastName, userName, email, password, role, cb) {
	_models.User.findOne ({
		where: {
			firstName: firstName,
			lastName: lastName
		}
	}).then (function (user) {
		if (!user) {
			_models.Role.findOrCreate ({
				where: {
					title: role
				}
			}).then(function ( role ) {
				var newUser = {
					firstName: firstName,
					lastName: lastName,
					userName: userName,
					password: password,
					email: email,
					RoleId: role[0].id
				};
				_models.User.create (newUser, function (err, user) {
					if (err) {
						cb (err, null);
					} else {
						cb(null, user);
					}
				});
		 	});
		} else {
			cb ("User " + firstName + " already exists", null);
		}
	});
};

// createUser ("lawrence", "bolu", "law", "law@gmail.com", "bolutife", "Administrator", function (err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Created user!");
// 	}
// });

/**
 * [createRole: creat/insert role into the database]
 * @param  {[string]} title [name of the role]
 * @return {[string]}  successfully created/inserted role     [Role successfully created/inserted into the database]
 */
exports.createRole = function (title, cb) {
	var newRole = {
		title: title
	};
	_models.Role.findOrCreate ({
		where: newRole
	}).then (function () {
		cb("Role " + title + " successfully created", null);
	});
};
//createRole ("Administrator");

/**
 * [createRole: create/insert role into the database]
 * @param  {[string]} title [name of the document]
 * @param  {[string]} content [content of the doc]
 * @param  {[string]} userName [username of the creator of the doc]
 * @param  {[string]} role [roles with access to the doc]
 * @return {[string]}  successfully created/inserted document     [Document successfully created/inserted into the database]
 */
// exports.createDocument = function (title, content, userName, roles) {
// 	_models.User.findOne ({
// 		where: {
// 			userName: userName
// 		}
// 	}).then (function (user) {
// 		if (user) {
// 			console.log(user);
// 			_models.Role.findOrCreate ({
// 				where: {
// 					title: {
// 						$in: roles
// 					}
// 				}
// 			}).then (function (roles) {
// 				var newDocument = {
// 					title: title,
// 					content: content,
// 					UserId: user.id
// 				}
//
// 				_models.Document.create (newDocument);
// 				console.log ("Document " + title + " successfully created");
// 				_models.Document.addRoles(roles);
// 				console.log ("Roles added");
// 			});
// 		} else {
// 			console.log ("Document " + title + " failed to create");
// 		}
// 	});
// }
//createDocument("mydoc", "maryam is a girl", "yhemmy",["Administrator", "superAdministrator"]);

/**
 * [getAllUsers: returns all exisitng users in the database]
 * @return {[object]} [all the users available in the database]
 */
exports.getAllUsers = function (cb) {
	_models.User.findAll ().then ( function (users) {
		if (!users)
			cb ("user does not exist", null);
		cb (null, users);
	});
};
//getAllUsers();

/**
 * [getAllRoles: returns all exisitng roles in the database]
 * @return {[object]} [all exisitng roles in the database]
 */
exports.getAllRoles = function (cb) {
	_models.Role.findAll (). then ( function (roles) {
		if(!roles){
			cb("role does not exist", null);
		}
		cb(null, roles);
	});
};

//getAllRoles();

/**
 * [getAllDocuments: returns all exisitng documents in the database within the specified limit]
 * @param  {[integer]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified limit]
 */
exports.getAllDocuments = function (limit, cb) {
	var getDocuments = {
		limit: limit,
		order: [
			['createdAt', 'ASC']
		],
		include: [{all: true}]
	};
	_models.Document.findAll (getDocuments). then ( function (documents) {
		if (!documents)
			cb("Documents not found", null);
		cb(null, documents);
	});
};
//getAllDocuments(2);

/**
 * [getAllDocumentsByDate: exisitng documents in the database within the specified role/limit]
 * @param  {[string]} role  [description]
 * @param  {[int]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified date/limit]
 */
// exports.getAllDocumentsByRole = function (role, limit) {
// 	var docByRole = {
// 		limit: limit,
// 		title: role,
// 		order: [
// 			['createdAt', 'ASC']
// 		],
// 		include: [{all: true}]
// 	}
// 	_models.Document.findAll ({
// 		where: docByRole
// 	}).then (function (docs) {
// 		return docs;
// 	})
// }
// getAllDocumentsByRole ("Administrator", 2);

/**
 * [getAllDocumentsByDate: exisitng documents in the database within the specified date/limit]
 * @param  {[date]} date  [description]
 * @param  {[int]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified date/limit]
 */
exports.getAllDocumentsByDate = function (date, limit, cb) {
	var docByDate = {
		limit: limit,
		createdAt: date,
		order: [
			['createdAt', 'ASC']
		],
		include: [{all: true}]
	};
	_models.Document.findAll (docByDate).then (function (docs) {
		if (!docs)
			cb("Docs no found", null);
		cb(null, docs);
	});
};
//getAllDocumentsByDate (2015-11-24, 1);
