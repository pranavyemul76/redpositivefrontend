import axios from "axios";
import React from "react";

const Userdata = () => {
  const [userdata, setuserdata] = React.useState([]);
  const [updateData, seupdatedata] = React.useState({});
  const [loading, setloading] = React.useState(false);
  const handleupdate = (id, username, phone, email, hobbies) => {
    seupdatedata({
      ...updateData,
      id,
      username,
      phone,
      email,
      hobbies,
    });
  };
  const handleuser = (e) => {
    var fl = e.target.name;
    const re = /^[0-9\b]+$/;
    if (
      (fl = ("telephone" && e.target.value === "") || re.test(e.target.value))
    ) {
      updateData[e.target.name] = e.target.value;
      seupdatedata({ ...updateData });
    } else {
      updateData[e.target.name] = e.target.value;
      seupdatedata({ ...updateData });
    }
  };
  const handleSubmit = (event) => {
    setloading(true);
    event.preventDefault();

    axios({
      url: "https://forbackend.herokuapp.com/userupdate",
      method: "PUT",
      data: {
        id: updateData.id,
        username: updateData.username,
        phone: updateData.phone,
        email: updateData.email,
        hobbies: updateData.hobbies,
      },
    }).then((res) => {
      setloading(res.data.messeage);
      setTimeout(() => {
        setloading(false);
      }, 8000);
    });
  };

  React.useEffect(() => {
    axios({
      url: `https://forbackend.herokuapp.com/userget`,
      method: "GET",
      header: { "content-type": "application/json" },
    }).then((res) => {
      setuserdata(res.data.user);
    });
  }, []);
  const handledelete = (email_id) => {
    const veer = email_id;
    console.log(veer);
    axios({
      url: `http://forbackend.herokuapp.com/deletedata/${veer}`,
      method: "DELETE",
    }).then((res) => {
      alert(res.data.messeage);
    });
  };
  const sendmail = (item) => {
    axios({
      url: "http://forbackend.herokuapp.com/emailsend",
      method: "POST",
      data: {
        username: item.username,
        email: item.email,
        hobbies: item.hobbies,
        phone: item.phone,
      },
    }).then((res) => {
      alert(res.data.messeage);
      window.location.reload();
    });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalOne"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title {loading && loading}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="center">
              {
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="user_input">
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        name="username"
                        defaultValue={updateData.username}
                        onChange={handleuser}
                      />
                    </div>
                    <div className="user_input">
                      <input
                        type="text"
                        required
                        minLength="10"
                        name="telephone"
                        maxLength="10"
                        defaultValue={updateData.phone}
                        placeholder="Mobile NO"
                        onChange={handleuser}
                      />
                    </div>
                    <div className="user_input">
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        name="email"
                        defaultValue={updateData.email}
                        onChange={handleuser}
                      />
                    </div>
                    <div className="user_input">
                      <input
                        type="text"
                        required
                        name="hobbies"
                        defaultValue={updateData.hobbies}
                        placeholder="Hobbies"
                        onChange={handleuser}
                      />
                    </div>
                    <div style={{ color: "red", textAlign: "center" }}>
                      <input type="submit" value="Update" />
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            {console.log(updateData)}
            <th scope="col">select</th>
            <th scope="col"> #</th>
            <th scope="col"> name</th>
            <th scope="col">phone</th>
            <th scope="col">email</th>
            <th scope="col">Hobbies</th>
            <th scope="col"> Actions</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((item, index) => {
            return (
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td> {index + 1}</td>
                <td> {item.username}</td>
                <td> {item.phone}</td>
                <td> {item.email}</td>
                <td> {item.hobbies}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      sendmail(item);
                    }}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    style={{ margin: "4px" }}
                    className="btn "
                    data-toggle="modal"
                    data-target="#exampleModalOne"
                    onClick={() => {
                      handleupdate(
                        item._id,
                        item.username,
                        item.phone,
                        item.email,
                        item.hobbies
                      );
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      handledelete(item.email);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Userdata;
