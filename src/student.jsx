import { useEffect, useState } from "react"
import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Student(){

    const [Student, setStudent] = useState([])
    const [beli, setBeli] = useState('')
    const [price, setPrice] = useState('')
    const [payment, setPayment] = useState('')
    const [jenis, setJenis] = useState('')
    const [tujuan, setTujuan] = useState('')
    const [edit, setEdit] = useState(null)

    const fetchStudent = async() => {
      const data = await fetch(`http://localhost:3000/beli`)
      const result = await data.json()
      setStudent([...result])
    }

  //  const onSubmitButton = async function(){
  //   let updateData = {
  //              beli: beli,
  //              price: price,
  //              payment: payment,
  //              jenis: jenis,
  //              tujuan: tujuan
  //           }
  //           const getEdit = await fetch(`http://localhost:3000/beli/${edit}`,
  //               {
  //                   method: 'PUT', body: JSON.stringify(updateData),
  //                   headers: { 'Content-type': 'application/json; charset=UTF-8', },
  //               })
  //           fetchStudent()
  //           console.log('');
  //  console.log("Submit");
  //  }

  
    
  //  const onAddButton = async function(){
  //    let postData = {
  //             id: Student.id + 1,
  //              beli: beli,
  //              price: price,
  //              payment: payment,
  //              jenis: jenis,
  //              tujuan: tujuan
  //           }
  //           const createData = await fetch(`http://localhost:3000/beli`,
  //           {
  //              method: 'POST', body: JSON.stringify(postData),
  //                       headers: { 'Content-type': 'application/json; charset=UTF-8', },
  //                   })
  //                   console.log('add');
  //               fetchStudent()
  //  }
    const onSubmitButton = async function(e){
      console.log('submit');
      e.preventDefault();
      if(edit === null){
        let postData = {
          id: Student.id + 1,
           beli: beli,
           price: price,
           payment: payment,
           jenis: jenis,
           tujuan: tujuan
        }
        const createData = await fetch(`http://localhost:3000/beli`,
        {
           method: 'POST', body: JSON.stringify(postData),
                    headers: { 'Content-type': 'application/json; charset=UTF-8', },
                })
                console.log('add');
            fetchStudent()
              
        } else {
          let updateData = {
           beli: beli,
           price: price,
           payment: payment,
           jenis: jenis,
           tujuan: tujuan
        }
        const getEdit = await fetch(`http://localhost:3000/beli/${edit}`,
            {
                method: 'PUT', body: JSON.stringify(updateData),
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
            })
        fetchStudent()
        console.log('');
    }
  }
      
    
    
 useEffect(() =>{
      fetchStudent()
    }, [])



    const handleDelete = async function (index){
      const deleteData = await fetch(`http://localhost:3000/beli/${index}`,
      { method: 'DELETE' })
      fetchStudent()
        console.log('delete');
    }


   const handleEdit = async function (index){
    let dataEdit = Student.find((item) => item.id === index)
    setEdit(dataEdit.id)
    setBeli(dataEdit.beli)
    setPrice(dataEdit.price)
    setPayment(dataEdit.payment)
    setJenis(dataEdit.jenis)
    setTujuan(dataEdit.tujuan)
    console.log(dataEdit, 'wjkwjkjek');
   }


    const onChangeJenis = (e) => {
      const value = e.target.value
      setJenis(value)
    }
    
    const onChangeTujuan = (e) => {
      const isChecked = e.target.checked
      const value = e.target.value
      if(isChecked){
        setTujuan([
          ...tujuan,
          value
        ])
      }else{
        const newTujuan = tujuan.filter(x => x !== value)
        setTujuan([...newTujuan])
      }
    }


    return(
        <>
        <h1>Budget Tracking</h1>
        <div className="d-flex flex-row">
        <div className="card">
          <div className="card-header">Masukan Pengeluaranmu : </div>
              <div className="card-body">
              <form onSubmit={onSubmitButton}>
                <div className="labelBeli">
                <label className="pembelian">Pembelian</label>
                <input type="text" value={beli} onChange={(e) => setBeli(e.target.value)}/>
                </div>
                <br />
                <div className="labelHarga">
                  <label className="price"> Price</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                  <br />
                  <label className="label">Payment</label>
                  <select  className="payment" value={payment} onChange={(e) => setPayment(e.target.value)}>
                    <option value="#">-Select Payment-</option>
                    <option value="cash">Cash</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <br />
                <div>
                  <label className="label">Jenis Pembelian</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" checked={jenis == 'Barang'} value='Barang' onChange={onChangeJenis}/>
                    <label className="form-check-label">Barang</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"checked={jenis == 'Jasa'} value='Jasa' onChange={onChangeJenis}/>
                    <label className="form-check-label">Jasa</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"checked={jenis == 'Makanan'} value='Makanan' onChange={onChangeJenis}/>
                    <label className="form-check-label">Makanan</label>
                  </div>
                 </div>
                  <br />
                  <div>
                 <label className="label">Tujuan Pembelian</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value='Keinginan' checked={tujuan.includes('Keinginan')} onChange={onChangeTujuan}/>
                    <label className="form-check-label">Keinginan</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value='Kebutuhan' checked={tujuan.includes('Kebutuhan')} onChange={onChangeTujuan}/>
                    <label className="form-check-label">Kebutuhan</label>
                  </div>
                  
                </div>
                </form>
              </div>
              <button type="submit" className="btnSubmit" onClick={onSubmitButton}>Submit</button>
        </div>

        <div className="tabel-div">
        <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Pembelian</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Jenis Pembelian</th>
            <th>Tujuan Pembelian </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              Student.map((x, index) =>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{x.beli}</td>
                    <td>{x.price}</td>
                    <td>{x.payment}</td>
                    <td>{x.jenis}</td>
                    <td>{x.tujuan.toString()}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(x.id)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(x.id)}>Delete</button>
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

export default Student
