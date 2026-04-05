import React, { useState } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import "./cta.css";

const CTASection = () => {
  const [active, setActive] = useState("career");

  return (
    <div className="cta_section">
      <Container className="text-center">
        <ButtonGroup className="cta_group">
          
          <Button
            className={`cta_btn ${active === "career" ? "active" : ""}`}
            onClick={() => setActive("career")}
          >
            Talk to a Career Expert
          </Button>

          <Button
            className={`cta_btn ${active === "college" ? "active" : ""}`}
            onClick={() => setActive("college")}
          >
            Talk to a College Expert
          </Button>

        </ButtonGroup>
      </Container>
    </div>
  );
};

export default CTASection;