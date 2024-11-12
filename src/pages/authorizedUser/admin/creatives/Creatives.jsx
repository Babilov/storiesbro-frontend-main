import { Box } from "@mui/material";
import React, { useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";

const Creatives = () => {
  const [authed, setAuthed] = useState(false);

  return (
    <>
      {!authed ? (
        <CreativessBeforeEnter setAuthed={setAuthed} />
      ) : (
        <CreativesAfterEnter />
      )}
    </>
  );
};

export default Creatives;
