import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-black-90 mid-gray pv4 ph3 ph5-m ph6-l mb0">
            <small className="f6 db tc">© 2020 <b class="ttu">SOME COMPANY Inc</b>., All Rights Reserved</small>
            <div className="tc mt3">
                <a href="/language/" title="Language" className="f6 dib ph2 link mid-gray dim">Language</a>
                <a href="/terms/" title="Terms" className="f6 dib ph2 link mid-gray dim">Terms of Use</a>
                <a href="/privacy/" title="Privacy" className="f6 dib ph2 link mid-gray dim">Privacy</a>
                <a href='https://www.freepik.com/psd/banner' className="f6 dib ph2 link mid-gray dim">Banner psd created by freepik - www.freepik.com</a>
            </div>
        </footer>

    )
}