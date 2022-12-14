import React, { forwardRef, useImperativeHandle, useState } from 'react'

const CampusCommInvolForm = forwardRef((props, _ref) => {
    const [invol, setInvol] = useState([
        { title: '', clubName: '', from: null, to: null, bulletPt1: '', bulletPt2: '' }
    ]);

    const addHandler = () => {
        let newF = { title: '', clubName: '', from: null, to: null, bulletPt1: '', bulletPt2: '' }
        setInvol([...invol, newF]);
    }
    const removeHandler = (idx) => {
        let data = [...invol];
        data.splice(idx, 1);
        setInvol(data);
    }

    const handleFormChange = (idx, e) => {
        let data = [...invol]
        data[idx][e.target.name] = e.target.value
        setInvol(data)
    }

    useImperativeHandle(_ref, () => ({
        getCampusDeets: () => {
            return invol;
        },
    }));

    function validateForm(d) {
        let ans = true;
        let data = [...d];

        for (let i = 0; i < data.length; i++) {
            if (!data[i]['title'] || !data[i]['clubName'] || !data[i]['from'] || !data[i]['to'] || !data[i]['bulletPt1'] || !data[i]['bulletPt2']) ans = false;
        }
        return ans;
    }
    return (
        <div>
            <form>
                <h3> Campus And Community Involvement Details </h3>
                {invol.map((input, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <input type='text' placeholder='Your Title'
                                value={input.title} name='title' onChange={(e) => handleFormChange(idx, e)} />
                            <input type='text' placeholder='Club/Organization Name'
                                value={input.clubName} name='clubName' onChange={(e) => handleFormChange(idx, e)} />
                            <input type='text' placeholder='from'
                                value={input.from} name='from' onChange={(e) => handleFormChange(idx, e)} />
                            <input type='text' placeholder='to'
                                value={input.to} name='to' onChange={(e) => handleFormChange(idx, e)} />
                            <input type='text' placeholder='Description Point 1'
                                value={input.bulletPt1} name='bulletPt1' onChange={(e) => handleFormChange(idx, e)} />
                            <input type='text' placeholder='Description Point 2'
                                value={input.bulletPt2} name='bulletPt2' onChange={(e) => handleFormChange(idx, e)} />

                            {invol.length > 1 ? <button onClick={(e) => { e.preventDefault(); removeHandler(idx) }}>Remove</button> : <></>}
                        </React.Fragment>
                    )
                })}
                <button onClick={(e) => {
                    e.preventDefault()
                    addHandler()
                }}>Add Involvement Experience</button>
                <input
                    type='submit'
                    onClick={props.next}
                    disabled={!(validateForm(invol))} />
            </form>

        </div>
    )
})

export default CampusCommInvolForm