import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

function App() {
 

  const [users, setUsers] = useState ([
    {
     id: 1,
     name: 'jeje',
     email: 'jeje@gmail.com',
     gender: 'Female',
     kelas: 'XI',
     hobby: ['dance']
    },
    {
      id: 2,
      name: 'manda',
      email: 'manda@gmail.com',
      gender: 'Female',
      kelas: 'X',
      hobby: ['dance']
     }
]
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [kelas, setKelas] = useState([])
  const [hobby, setHobby] = useState([])

  let [indexToUpdate, setIndexToUpdate] = useState(null)

  const onSubmitButton = (e, index) => {
    e.preventDefault()
    if(indexToUpdate === null){
       const newData = users
        newData.push({
          name: name,
          email: email,
          gender: gender,
          kelas: kelas,
          hobby: hobby
      })
      setUsers([...newData])

      resetForm()

    }else{
      
      const newUpdate = users

      newUpdate[indexToUpdate].name = name,
      newUpdate[indexToUpdate].email = email,
      newUpdate[indexToUpdate].gender = gender,
      newUpdate[indexToUpdate].kelas = kelas,
      newUpdate[indexToUpdate].hobby = hobby

      setUsers([...users])
  
}
}
  

  const resetForm = () => {
    setName('')
    setEmail('')
    setGender('')
    setKelas('')
    setHobby([])
  }

  const onChangeKelas = (e) => {
    const value = e.target.value
    setKelas(value)
  }

  const onChangeHobby = (e) => {
    const isChecked = e.target.checked
    const value = e.target.value
    if(isChecked){
      setHobby([
        ...hobby,
        value
      ])}else{
        const newHobby = hobby.filter(x => x !== value)
        setHobby([...newHobby])
      }
    }

    const handleDelete = (x) => {
      const usersDel = users.filter(i => i.id !== x.id)
      setUsers([...usersDel])
      
      console.log("hapus");
    }

    const handleEdit = (index) => {
      //to get index
      let newArr= users
      setIndexToUpdate(index)
      setName(newArr[index].name)
      setEmail(newArr[index].email)
      setGender(newArr[index].gender)
      setKelas(newArr[index].kelas)
      setHobby(newArr[index].hobby)
  
      console.log(index, 'jjj')
    }


  return (
    <>
    <h1>DATA SISWA TADIKA MESRA</h1>
      <div className="d-flex flex-row">
        <div className="card">
          <div className="card-header">Form New Student</div>
          <div className="card-body">
            <form onSubmit={onSubmitButton}>
              <div className="mb-4">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <div className="selectGender">
                  <label htmlFor="gender" className="label">
                    Gender
                  </label>
                  <br />
                  <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="#">-</option>
                     <option value="Male" > Male</option>
                    <option value="Female" >Female</option>
                  </select>
                </div>
              </div>

              <div className="leftcon">
                <label htmlFor="class" className="label">
                  Class
                </label>
                <div>
                  <input
                    type="radio"
                    name="kelas"
                    checked={kelas == 'XII'}
                    value="XII"
                    onChange={onChangeKelas}
                  />
                  <label htmlFor="XII">XII</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="kelas"
                    value="XI"
                    checked={kelas == 'XI'}
                    onChange={onChangeKelas}
                  />
                  <label htmlFor="XII">XI</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="kelas"
                    value="X"
                    checked={kelas == 'X'}
                    onChange={onChangeKelas}
                  />
                  <label htmlFor="XII">X</label>
                </div>
              </div>

              <br />
            
              <div className="leftcon">
                <label htmlFor="class" className="label" value={hobby}>
                  Hobby
                </label>
                <div>
                  <input
                    type="checkbox"
                    name="hobby"
                    value="dance"
                    checked={hobby.includes('dance')}
                    onChange={onChangeHobby}
                  />
                  <label htmlFor="dance">Dance</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="hobby"
                    value="basketball"
                    checked={hobby.includes('basketball')}
                    onChange={onChangeHobby}
                  />
                  <label htmlFor="basketball">Playing Basketball</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="hobby"
                    value="cooking"
                    checked={hobby.includes('cooking')}
                    onChange={onChangeHobby}
                  />
                  <label htmlFor="cooking">Cooking</label>
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
          <div className="card-footer">Latihan 1</div>
        </div>

        <div className="card-tbl">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Hobby</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              users.map((x,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.gender}</td>
                  <td>{x.kelas}</td>
                  <td>{x.hobby.toString()}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(x)}>Delete</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
            }

            
export default App;
