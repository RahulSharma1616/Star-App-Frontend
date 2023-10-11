import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TfiPencil } from "react-icons/tfi";

export default function Profile({ closeWin }) {
    const [cookies, setCookie] = useCookies(['token']);
    const [user, setUser] = useState(null); // Initialize user state
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State variable for selected image file
    let fileInput; 

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
    }, [cookies.token]); // Add cookies.token as a dependency to re-fetch data when the token changes


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        if (file) {
            handleSubmit();
          }
      };
    
      // Function to handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);
    
          axios({
            method: 'post',
            url: 'http://localhost:4000/user/image',
            data: formData,
            headers: {
              'Authorization': `Bearer ${cookies.token}`,
              'Content-Type': 'multipart/form-data', // Important for file upload
            },
          })
            .then((response) => {
              // Handle the response as needed
              console.log('Image uploaded successfully:', response);
              setIsHovered(false); // Close the file picker
            })
            .catch((error) => {
              console.error('Image upload failed:', error);
            });
        }
      };

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

    return (
        <div className="profile-modal">
            {/* Check if user data is available */}
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
                        <form action="http://localhost:4000/user/image" method="POST" enctype="multipart/form-data">
                            <img
                                src="https://res.cloudinary.com/djtkzefmk/image/upload/v1696966182/Untitled_design_xayf52.png"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => fileInput.click()}
                                alt="User"
                                className="user-image mb-3"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                            <input
                                type="file"
                                id="fileInput"
                                ref={(input) => (fileInput = input)}
                                style={{ display: 'none' }}
                            />
                        </form>
                    }

                    <h4 className="fs-3 mb-1">{user.name}</h4>
                    <p className="fs-6">{user.designation}</p>
                </div>
            )}
            <hr style={{ margin: "30px" }} />
            {user && (
                <div style={{ margin: "20px" }} className="fs-5">
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
                            <button type="button" onClick={handlePasswordSubmit} class="btn btn-outline-primary mb-3">Change Password</button>
                        </div>
                    </div>
                    }
                </div>
            )}
        </div>
    );
}
