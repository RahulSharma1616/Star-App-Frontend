import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  console.log(projects)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/project/resource",
      headers: {
        'Authorization': `Bearer ${cookies.token}`,
      }
    }).then(function (response) {
      setProjects(response.data)
    }, function (error) {
      console.log("error: ", error)
    })

  }, []);


  return (
    <>
      <div className="d-flex">
        <div>
          <SideNav />
        </div>
        <div className="table-container p-5">
          <div className="row">
            {
              projects.map(project => {
                return (
                  <div className="col-lg-4">
                    <div className="project-card1 shadow-lg text-center">
                      <h3 className="projectHeading ">{project.projectName}</h3>
                      <h3 className="projectSubheading">{project.id}</h3>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}