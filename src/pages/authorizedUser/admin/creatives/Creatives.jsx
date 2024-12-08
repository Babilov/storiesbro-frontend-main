import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativessBeforeEnter1 from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter1";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";

const Creatives = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem("is_authed");
    if (isAuthed === "true") {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

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
