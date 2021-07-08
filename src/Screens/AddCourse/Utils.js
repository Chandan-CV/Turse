
import { db } from "../../Fire";
import firebase from "firebase"

export const Submit = async ({name,tags,content,TURI,user}) => {
    await   db
        .collection("QC")
        .doc()
        .set({
          name: name,
          tags: tags.split(",").map(item => item.trim()),
          userID: user.uid,
          createdBy: user.displayName,
          TOC: firebase.firestore.FieldValue.serverTimestamp(),
          content: content,
          thumbnail:TURI
        })
        .then(() => {
        db.collection("Users")
            .doc(user.uid)
            .update({
              saved: firebase.firestore.FieldValue.delete(),
            })
             
            });
        }
