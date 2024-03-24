const express = require('express')
const { exec } = require('child_process')

const app = express()
const port = 3000

app.get('/create-token', (req, res) => {
    const command = `kubectl -n kubernetes-dashboard create token readonly-user`

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return res.status(500).send('Error executing kubectl command')
        }
        res.send(stdout)
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
