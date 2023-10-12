import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TfiPencil } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function Profile({ closeWin }) {

    const [cookies, setCookie] = useCookies(['token']);
    const [user, setUser] = useState(null);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [imageEdit, setImageEdit] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/user/profile",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        })
            .then(function (response) {
                // Update the user state with the data from the API response
                setUser(response.data);
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    }, [cookies.token, imageEdit]); // Add cookies.token as a dependency to re-fetch data when the token changes


    function handlePasswordEdit() {
        setIsEditingPassword(true)
    }

    function handlePasswordChange(e) {
        setNewPassword(e.target.value)
    }

    function handlePasswordSubmit() {
        axios({
            method: "post",
            url: "http://localhost:4000/user/password",
            data: {
                password: newPassword
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setIsEditingPassword(false)
        })
    }

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('photo', selectedImage);
    
        try {
          const response = await axios.post('http://localhost:4000/user/image', formData, {
            headers: {
              'Authorization': `Bearer ${cookies.token}`,
              'Content-Type': 'multipart/form-data', // Important for file upload
            },
          });

        setImageEdit(false);
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      };

    return (
        <div className="profile-modal">
            {user && (
                <div className="text-center">
                    {!isHovered && <img
                        src={user.image.url}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        alt="User"
                        className="user-image mb-3"
                        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />}
                    {isHovered &&
                        <div>
                            <img
                                src="https://res.cloudinary.com/djtkzefmk/image/upload/v1696966182/Untitled_design_xayf52.png"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => { setImageEdit(true) }}
                                alt="User"
                                className="user-image mb-3 clickable-cell"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                        </div>
                    }

                    <h4 className="fs-3 mb-1">{user.name}</h4>
                    <p className="fs-6">{user.designation}</p>
                </div>
            )}
            <hr style={{ margin: "30px" }} />
            {user && !imageEdit && (
                <div style={{ margin: "20px" }} className="fs-6">
                    <div><p><strong>Email:</strong> {user.email}</p></div>
                    {!isEditingPassword && <div>
                        <span><strong>Password:</strong> **********</span>
                        <button style={{ padding: "2px 12px 10px 12px" }} onClick={handlePasswordEdit} className="btn">
                            <TfiPencil />
                        </button>
                    </div>}
                    {isEditingPassword && <div>
                        <div class="row d-flex justify-content-start">
                            <label for="inputPassword2" class="form-label col-5"><strong>New Password:</strong></label>
                            <input onChange={handlePasswordChange} type="password" class="form-control col" id="inputPassword2" placeholder="Password" />
                        </div>
                        <div class="col-auto m-3 text-end">
                            <button type="button" onClick={handlePasswordSubmit} class="btn btn-outline-primary btn-sm mb-3">Change Password</button>
                        </div>
                    </div>
                    }
                </div>
            )}
            {imageEdit &&

                <form action="http://localhost:4000/user/image" method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label"><strong>Select Profile Picture:</strong></label>
                        <input name="photo" className="form-control" onChange={handleFileChange} type="file" id="formFile" accept=".jpg, .jpeg, .png, .gif" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary">Upload</button>
                    </div>
                </form>
            }
        </div>
    );
}
