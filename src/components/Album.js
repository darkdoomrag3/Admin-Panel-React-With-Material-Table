import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "./Alert";


export default function Album() {

  class table {
    constructor(props) {

      return singer.map(Name => singer(Name), [])

     


    }


  }



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



  const [state, setState] = React.useState({
    data: []
  });

  useEffect(() => {
    axios.get("api/admin/v1/album").then(response => {
      setState({ data: response.data.result })
    }


    )
  }, [])


  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [singers, setSingers] = useState([]);
  const singer = singers.reduce(function (acc, cur, i) {
    acc[acc._id] = cur.Name;
    return acc;
  }, {});
  useEffect(() => {
    axios.get("api/admin/v1/singer").then(response => {
      setSingers(response.data.result);
    })
  }, [])


  function handleClose(e, reason) {
    if (reason === "clickAway") {
      return;
    }
    setOpen(false);
  }


  return (

   <>


    <MaterialTable
      title="Album Table"
      columns={[
        { title: "Name", field: "Name" },
        {
          title: "Photo", field: "Photo",

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

        },
        {
          title: "Active", field: "Active",

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
          title: "Singer",
          field: "inger",
          lookup: singer,

          render: rowData => (

            this.state.table



          )



        },
      ]}


      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {

            const AlbumData = new FormData();
            AlbumData.append("Name", newData.Name);
            AlbumData.append("Active", newData.Active);
            AlbumData.append("photo", newData.Photo);
            axios.post("api/admin/v1/Album").then(response => {
              const data = state.data
              data.push(response.data.result);
              setState({ data });
              if (response.data.message.statusCode === 200) {

                resolve();
                setMessage("Thank You For Add");
                setVariant("success");
                setOpen(true)

              } else {

                resolve();
                setMessage("You can not add album");
                setVariant("error");
                setOpen(true);


              }

            }).catch(err => {
              resolve();
              setOpen(true);
              setMessage("You can not Add");
              setVariant("error");
            });

          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {

            const AlbumData = new FormData();
            AlbumData.set("Name", newData.Name);
            AlbumData.set("Active", newData.Active);
            AlbumData.append("Photo", newData.Photo);
            axios.put(`api/admin/v1/Album/${oldData._id}`, AlbumData)
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

              }).catch(err => {
                resolve();
                setOpen(true);
                setMessage("You can not Add");
                setVariant("error");
              });

            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
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
