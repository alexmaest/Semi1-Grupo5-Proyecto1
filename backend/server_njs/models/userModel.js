class userModel {
  constructor(id_user, name, password) {
    this.id_user = id_user;
    this.name = name;
    this.password = password;
  }

  save(user) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO user (name, password) VALUES (?, ?);';
      db.connection.query(query, [user.name, user.password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  update(user) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE user SET ? WHERE id_user = ?';
      db.connection.query(query, [user.name, user.id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  delete(userId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM user WHERE id_user = ?';
      db.connection.query(query, userId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findById(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user WHERE id_user = ?';
      db.connection.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = new userModel();
