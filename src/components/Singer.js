import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "./Alert";

function Singer() {
  const useStyles = makeStyles(theme => ({
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60
    },
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    }
  }));

  const classes = useStyles();
  const [state, setState] = useState({
    data: []
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [variant, setVariant] = useState("none");

  useEffect(() => {
    axios
      .get("api/admin/v1/singer")
      .then(response => setState({ data: response.data.result }))
      .catch(err => console.log(err));
  }, []);

  function handleClose(e, reason) {
    if (reason === "clickAway") {
      return;
    }
    setOpen(false);
  }

  return (
    <>
      <Alert
        open={open}
        onClose={handleClose}
        message={message}
        variant={variant}
      />
      <MaterialTable
        title="Singer Table"
        columns={[
          { title: "Name", field: "Name" },
          {
            title: "Active",
            field: "Active",
            editComponent: props =>
              (
                <Checkbox
                   checked={props.rowData.Active}
                  onChange={e => props.onChange(e.target.checked)}
                  value={props.value}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              ),
            render: rowData => (
              <Checkbox
                disabled
                checked={rowData.Active}
                // onChange={handleChange("checkedA")}
                value=""
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />
            )
          },
          {
            title: "Photos",
            field: "Photo",
            editComponent: props => (
              <>
                <input
                  onChange={e => props.onChange(e.target.files[0])}
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  // multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className={classes.button}
                  >
                    Upload
                  </Button>
                </label>
              </>
            ),
            render: rowData => (
              <Avatar
                alt={rowData.Name}
                src={rowData.Photo}
                className={classes.bigAvatar}
              />
            )
          }
        ]}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              // console.log(newData)
              const formData = new FormData();
              formData.append("Name", newData.Name);
              formData.append("Active", newData.Active);
              formData.append("Photo", newData.Photo);
              axios
                .post("api/admin/v1/singer", formData)
                .then(response => {
                  const data = state.data;
                  data.push(response.data.result);
                  setState({ data });
                  if (response.data.message.statusCode === 200) {
                    resolve();
                    setMessage("Thank You For Add");
                    setVariant("success");
                    setOpen(true);
                  } else {
                    resolve();
                    setOpen(true);
                    setMessage("You can not Add");
                    setVariant("error");
                  }
                })
                .catch(err => {
                  resolve();
                  setOpen(true);
                  setMessage("You can not Add");
                  setVariant("error");
                });
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const formData = new FormData();
              formData.set("Name", newData.Name);
              formData.set("Active", newData.Active);
              formData.append("Photo", newData.Photo);
              axios
                .put(`api/admin/v1/singer/${oldData._id}`, formData)
                .then(response => {
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = response.data.result;
                  setState({ ...state, data });

                  if (response.data.message.statusCode === 200) {
                    resolve();
                    setMessage("Your Update is ok");
                    setVariant("success");
                    setOpen(true);
                  } else {
                    resolve();
                    setMessage("You Update was failed");
                    setVariant("error");
                    setOpen(true);
                  }
                })
                .catch(err => {
                  resolve();
                  setMessage("You cant update");
                  setVariant("error");
                  setOpen(true);;
                });
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            })
        }}
      />
    </>
  );
}

export default Singer;
