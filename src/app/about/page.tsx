import { Container, Typography } from '@mui/material';
import React from 'react'

function About() {
    return (
        <Container fixed>
            <Typography variant='h3' align='center' sx={{ my: "3rem" }}>
                Welcome to Event Insta!
            </Typography>

            <Typography paragraph={true}>
                Our platform is an exploration into new ways of capturing and sharing event photos.
                Designed as an experimental endeavor, our goal is to push the boundaries and discover
                innovative solutions that enhance the event experience for all involved.
            </Typography>

            <Typography paragraph={true}>
                Guests are invited to participate by accessing our experimental platform through a
                simple QR code scan. Once inside, they have the opportunity to contribute their own
                photos to the event's collection or download their favorite memories.

            </Typography>

            <Typography paragraph={true}>
                Powered by cutting-edge technology such as Next.js 14, React 18, Node.js,
                and Express.js, our experimental website offers a dynamic and interactive experience.
                We've also incorporated Material-UI React for clean and intuitive styling.
            </Typography>
            <Typography paragraph={true}>
                As we embark on this experimental journey, our team is committed to exploring new ideas
                and features that challenge the status quo of event photography. Join us in this exciting
                exploration as we push the boundaries of what's possible.
            </Typography>
            <Typography paragraph={true}>
                Thank you for being a part of our experimental project as we venture into uncharted
                territory together!
            </Typography>

        </Container>
    )
}

export default About;