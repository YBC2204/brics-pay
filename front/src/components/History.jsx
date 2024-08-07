import { CTable , CTableBody , CTableHead,CTableRow , CTableHeaderCell , CTableDataCell } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'



const History = () =>
{

  return(
  <div className='w-full h-screen flex flex-col gap-10'>
  <div className='font-bold uppercase text-3xl text-center tracking-widest mt-20'>
      Purchase History (sample data)
  </div>
  
  <CTable className='mt-5' bordered color='dark' hover striped>
  <CTableHead className='text-blue-300'>
    <CTableRow>
      <CTableHeaderCell scope="col">#</CTableHeaderCell>
      <CTableHeaderCell scope="col">Class</CTableHeaderCell>
      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
      <CTableDataCell>@mdo</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
      <CTableDataCell>@fat</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell >Larry </CTableDataCell>
      <CTableDataCell>the Bird</CTableDataCell>
      <CTableDataCell>@twitter</CTableDataCell>
    </CTableRow>
  </CTableBody>
</CTable>

</div>
  )
}

export default History;


