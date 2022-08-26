

function Error(){
  return (
    <div>
      <h1>Error! Page Not Found!</h1>
      <button type="button" onClick={() => router.push('./Landing.js')}>
        Go Back
      </button>
    </div>
  )
}

export default Error
