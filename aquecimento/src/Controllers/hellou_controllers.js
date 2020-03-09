const express = require('express');

const controllers = {

    sendHellou: (req, res) => {
        const msg = `HELLOUUUU ${new Date()}`;
        res.json({ msg })
    }
};

module.exports = controllers;