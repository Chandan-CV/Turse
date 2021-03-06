import firebase from "firebase";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../../App";
import "../AddCourse/AddCourse.css";
import Navbar from "../../components/navbar/Navbar";
import { db, storage } from "../../Fire";
import PlayVid from "../../components/PlayVid";
import { Submit } from "./Utils";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function AddCourse() {
  const history = useHistory();
  const user = useContext(Context);
  const [content, setContent] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState(0);
  const [FileURL, setFileURL] = useState("");
  const [progress, setProgress] = useState(null);
  const [vidURL, setVidURL] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [name, setName] = useState("");
  const [tags, settags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbProgress, setThumbProgress] = useState(0);
  const [TURI, setTURI] = useState("");
  const [index, setIndex] = useState(-1);



  //this is for restoring the defaults
  const restoreDefaults = () => {
    setDialogOpen(false);
    setFile(null);
    setFileURL("");
    setLectureName("");
    setVidURL("");
    setProgress(0);
    setContent([]);
    setThumbnail(null);
    setTURI("");
    setThumbProgress(0);
    setName("");
    settags("");
  };

  //init
  useEffect(() => {
    if (user)
      db.collection("Users")
        .doc(user.uid)
        .get()
        .then((response) => {
          var data = response.data();
          if (data.saved !== undefined) {
            setContent(data.saved.content);
            setName(data.saved.name);
            settags(data.saved.tags.toString());
            setTURI(data.saved.thumbnail);
          }
        });
  }, [user]);
  // upload file
  const handleFileUpload = () => {
    if (file) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "stat_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setFileURL(url);
            });
        }
      );
    } else {
      alert("there is no file to upload");
    }
  };

  //to upload thumbnail
  const handleThumbUpload = () => {
    if (thumbnail) {
      const uploadTask = storage
        .ref(`thumbnails/${thumbnail.name}`)
        .put(thumbnail);
      uploadTask.on(
        "stat_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setThumbProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          storage
            .ref("thumbnails")
            .child(thumbnail.name)
            .getDownloadURL()
            .then((url) => {
              setTURI(url);
            });
        }
      );
    } else {
      alert("there is no file to upload");
    }
  };

  //uploading lecture
  const handleLectureUpload = () => {
    if(index>=0){
        var temp = content;
        temp[index].url = vidURL;
        temp[index].name = lectureName;

        
    }
    else{

      
      if (FileURL) {
        setContent([
          ...content,
          {
            url: FileURL,
            name: lectureName,
            index: content.length,
            type: "custom",
          },
        ]);
      } else if (vidURL) {
        setContent([
          ...content,
          {
            url: vidURL,
            name: lectureName,
            index: content.length,
            type: "youtube",
          },
        ]);
      } else {
        alert("there is nothing to add");
      }
    }
      setDialogOpen(false);
      setFile(null);
      setFileURL("");
      setLectureName("");
      setVidURL("");
      setProgress(0);
      setIndex(-1);
    };
    
    // this happens when you click submit
  const handleSubmit = async () => {
    await Submit({ name, tags, content, TURI, user }).then(() => {
      alert("done submitting");
      restoreDefaults();
    });
  };

  ///this happens when the user click on save
  const handleSave = async () => {
    await db
      .collection("Users")
      .doc(user.uid)
      .update({
        saved: {
          name: name,
          tags: tags.split(",").map((item) => item.trim()),
          userID: user.uid,
          createdBy: user.displayName,
          TOC: firebase.firestore.FieldValue.serverTimestamp(),
          content: content,
          thumbnail: TURI,
        },
      })
      .then(() => alert("course saved"))
      .catch((err) => alert(err));
  };

  //delete item
  const deleteLecture = (pos) => {
    var temp = content.filter((el) => el.index != pos);

    for (var i = 0; i < temp.length; i++) {
      console.log(i)
      temp[i]["index"] = i
    }
    console.log(temp)
    setContent(temp)
  };

const editLecture =(lecture)=>{
    if (lecture.type==="youtube"){
      setVidURL(lecture.url);
    }
    setIndex(lecture.index);
    setLectureName(lecture.name);
    setDialogOpen(true);

  }


  return (
    <div>
      <Navbar />
      <div className="mainAxis">
        <h1> glad to see you contributing</h1>
        <TextField
          label="enter the name of the course"
          variant="outlined"
          style={{ width: "60%", marginTop: 70 }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          label="enter tags separated by a comma. eg react native, javascript, mobile"
          multiline={true}
          variant="outlined"
          style={{ width: "60%", marginTop: 70 }}
          value={tags}
          onChange={(e) => {
            settags(e.target.value);
          }}
        />
      </div>
      <div className="mainAxis" style={{ marginTop: 30 }}>
        <p>select a thumbnail for the course</p>
        <input
          style={{ marginTop: 20, marginBottom: 30 }}
          type="file"
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
          }}
        />
        <Button
          onClick={() => {
            handleThumbUpload();
          }}
          variant="outlined"
        >
          upload thumbnail
        </Button>
        <LinearProgress
          variant="determinate"
          value={thumbProgress}
          style={{ height: "2px", width: "50%", marginTop: 10 }}
        />
        {TURI.length > 0 ? (
          <img src={TURI} style={{ height: 200, width: 200 }} />
        ) : null}
        <h1>course content</h1>
        <p>{JSON.stringify(content)}</p>
        {content.map((element) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                backgroundColor: "lightgray",
                marginTop: 20,
                width: "90%",
                alignItems: "center",
              }}
            >
              <div>
                {element.type === "youtube" ? (
                  <PlayVid url={element.url} width={150} height={150} />
                ) : (
                  <iframe src={element.url} width={150} height={150} />
                )}
              </div>
              <p>{element.name}</p>
              <div
                onClick={() => {
                  deleteLecture(element.index);
                }}
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </div>
              <div
                onClick={() => {
                editLecture(element)
                }}
                style={{ cursor: "pointer" }}
              >
                <EditIcon />
              </div>
            </div>
          );
        })}
        <Button
          variant="outlined"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add
        </Button>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            marginBottom: 50,
          }}
        >
          <div>
            <Button
              variant="outlined"
              style={{ marginRight: 40 }}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              style={{ marginLeft: 40 }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </div>

        {/*this is the dialog box  */}

        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        >
          <DialogTitle id="form-dialog-title">Add lecture</DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              margin="dense"
              id="lectureName"
              label="enter the name of the lecture"
              type="name"
              fullWidth
              variant="outlined"
              value={lectureName}
              onChange={(e) => {
                setLectureName(e.target.value);
              }}
            />
            {file ? null : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DialogContentText>
                  enter the url of the youtube video
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="url"
                  label="enter url"
                  type="url"
                  fullWidth
                  variant="outlined"
                  value={vidURL}
                  onChange={(e) => {
                    setVidURL(e.target.value);
                  }}
                />
                <h3>Or</h3>
              </div>
            )}

            {vidURL.length > 0 ? null : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DialogContentText>
                  you can upload any pdf or an image file
                </DialogContentText>
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <Button
                  variant="outlined"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    handleFileUpload();
                  }}
                >
                  upload
                </Button>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  style={{ height: "2px", width: "100%", marginTop: 10 }}
                />
              </div>
            )}
            <hr
              style={{
                height: 1,
                width: "100%",
                color: "black",
                backgroundColor: "black",
                marginTop: 20,
              }}
            />
            <Button
              variant="outlined"
              style={{ marginTop: 20 }}
              onClick={() => {
                handleLectureUpload();
              }}
            >
              Add
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AddCourse;
