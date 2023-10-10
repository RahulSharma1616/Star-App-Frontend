export default function CreateProject({closeWin}) {

    function handleName(e) {

    }

    function handleDescription(e) {

    }

    function handleVertical(e) {

    }

    function handleHorizontal(e) {

    }

    function handleSubHorizontal(e) {

    }

    function handleCustomerName(e) {

    }

    function handleCustomerID(e) {

    }

    function handleSubmit(e) {

    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">
                    Project Name
                </label>
                <input
                    className="form-control"
                    onChange={handleName}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Description
                </label>
                <input
                    className="form-control"
                    onChange={handleDescription}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Vertical
                </label>
                <input
                    className="form-control"
                    onChange={handleVertical}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Horizontal
                </label>
                <input
                    className="form-control"
                    onChange={handleHorizontal}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Sub-Horizontal
                </label>
                <input
                    className="form-control"
                    onChange={handleSubHorizontal}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Customer Name
                </label>
                <input
                    className="form-control"
                    onChange={handleCustomerName}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Customer ID
                </label>
                <input
                    className="form-control"
                    onChange={handleCustomerID}
                    required
                />
            </div>
            <button type="submit" className="btn btn-outline-primary">
                Sign Up
            </button>
        </form>
    </div>
    )
}