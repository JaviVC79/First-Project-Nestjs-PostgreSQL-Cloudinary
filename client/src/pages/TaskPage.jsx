import homeImage from '../../public/home.jpg'

function TaskPage() {
  return (
    <div className="flex inset-3 text-white justify-between py-16">
        <img src={homeImage} alt="Home" className="rounded"/>
        <div>
          <h1 className="text-5xl py-4">TaskPage</h1>
          <p>Note your task everywhere</p>
          <p>Make the most of your time</p>
          <p>No more downtime</p>
        </div>
    </div>
  )
}

export default TaskPage
