(function() {
  'use strict';
})();

var	_models = require ("./models");
function strip (obj) {
	return obj.dataValues;
}


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
 * [createRole: create/insert role into the database]
 * @param  {[string]} title [name of the role]
 * @return {[string]}  successfully created/inserted role     [Role successfully created/inserted into the database]
 */
var createRole = function (title, cb) {
	_models.Role.findOne ({
		where: {
			title: title
		}
	}).then (function (role) {
		if (!role) {
			var newRole = {
				title: title
			};
			_models.Role.create(newRole, function (err, role) {
				if (err) {
					cb(err, null);
				} else {
					cb(null, role);
				}
			});
		} else {
			cb("Role exists", null);
		}
	});
};

// createRole ("doc", function (err, role) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Created Role");
// 	}
// });

/**
 * [createRole: create/insert role into the database]
 * @param  {[string]} title [name of the document]
 * @param  {[string]} content [content of the doc]
 * @param  {[string]} userName [username of the creator of the doc]
 * @param  {[string]} role [roles with access to the doc]
 * @return {[string]}  successfully created/inserted document     [Document successfully created/inserted into the database]
 */
var createDocument = function (title, content, userName, roles, cb) {
	_models.Document.findOne({
		where: {
			title : title
		}
	}).then(function (document) {
		if (!document) {
			_models.User.findOne ({
				where: {
					userName: userName
				}
			}).then (function (user) {
				console.log(user);
				if (user) {
					_models.Role.findAll ({
						where: {
							title: {
								$in: roles
							}
						}
					}).then(function (_roles) {
						var newDocument = {
							title: title,
							content: content,
							UserId: user.id
						};
						_models.Document.create(newDocument).then(function (doc) {
								// console.log(doc);
								doc.setRoles(_roles).then(function(){
									_roles.forEach(function(role){
										role.addDocument(doc).then(function() {
										});
									});
								});
								cb("Roles added", null);
						});
						cb(null, doc);
					});
				} else {
					console.log ("Document " + title + " failed to create");
				}
			});
		} else {
			cb ("Document exists", null);
		}
	});
};

// createDocument("mydoc", "maryam is a girl", "law",["Administrator", "superAdministrator"], function (err, doc) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(doc);
// 	}
// });

/**
 * [getAllUsers: returns all exisitng users in the database]
 * @return {[object]} [all the users available in the database]
 */
var getAllUsers = function (cb) {
	_models.User.findAll ().then ( function (users) {
		if (!users)
			cb ("user does not exist", null);
		cb (null, users);
	});
};

// getAllUsers(function (err, users) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(users);
// 	}
// });

/**
 * [getAllRoles: returns all exisitng roles in the database]
 * @return {[object]} [all exisitng roles in the database]
 */
var getAllRoles = function (cb) {
	_models.Role.findAll (). then ( function (roles) {
		if(!roles){
			cb("role does not exist", null);
		}
		cb(null, roles);
	});
};

// getAllRoles(function (err, role) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(role);
// 	}
// });

/**
 * [getAllDocuments: returns all exisitng documents in the database within the specified limit]
 * @param  {[integer]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified limit]
 */
var getAllDocuments = function (limit, cb) {
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
// getAllDocuments(4, function (err, doc) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(doc);
// 	}
// });

/**
 * [getAllDocumentsByRole: exisiting documents in the database within the specified role/limit]
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
