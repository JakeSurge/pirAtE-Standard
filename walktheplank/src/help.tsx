import React from "react";

const PirateStandard = () => {
  return (
    <div>
      <h1>PirAtE Standard: Additional Substitution Layer for AES Encryption</h1>
      <p>
        The basic idea for this project was to add a substitution layer after
        some form of block cipher encryption had been performed such as AES
        (hence the name). This is not just any substitution layer, but a pirate
        substitution layer to abstract it more (and because it's funny).
        AES-128, AES-192, and AES-256 with Cipher Clock Chaining (CBC) (as
        provided by the PyCryptodome Python module) are the supported encryption
        algorithms, and there is custom IV support. At a high level, an S-box of
        sorts is made from shuffling a pirate wordset pseudorandomly using the
        same key used to encrypt with AES. The AES encrypted bytes are
        substituted out for pirate terms using this S-box, making it "piratey".
      </p>

      <h2>Setup</h2>

      <h3>Back End</h3>
      <ol>
        <li>
          After cloning the repository locally, install the needed dependencies
          by using this command globally <strong>(NOT RECOMMENDED)</strong> or
          in a Python virtual environment located in the root folder of the
          repository <strong>(Recommended)</strong>:
          <pre>
            <code>pip install -r requirements.txt</code>
          </pre>
        </li>
        <li>
          Next, to start the Flask app (the API), simply run{" "}
          <code>main.py</code>. If using a Python virtual environment, make sure
          to run <code>main.py</code> in the activated environment:
          <pre>
            <code>python main.py</code>
          </pre>
        </li>
      </ol>

      <h3>Front End</h3>
      <ol>
        <li>
          Go into the React project (<code>\walktheplank\</code>) in the
          repository and run the following npm command to install the needed
          dependencies:
          <pre>
            <code>npm install</code>
          </pre>
        </li>
        <li>
          After this, in the same directory, run the following command to start
          the React app <strong>(WARNING:</strong> Before starting the React
          app, make sure the back end is up and running):
          <pre>
            <code>npm start</code>
          </pre>
        </li>
      </ol>

      <div style={{ textAlign: "center" }}>
        <pre>
          {`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
...
<rest of the ASCII art>
...
           | |                                              
           |_|                                              
`}
        </pre>
      </div>
    </div>
  );
};

export default PirateStandard;
