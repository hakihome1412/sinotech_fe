import styled from "@emotion/styled";
import React, { ReactNode, useMemo } from "react";
import { Accordion } from "react-bootstrap";

type AccordionItem = {
  name: string;
  link: string;
  children?: {
    name: string;
    link: string;
  }[];
};

type Props = {
  options: AccordionItem[];
  expandAll?: boolean;
};

const AccordionContent = (props: Props): JSX.Element => {
  const { options, expandAll = false } = props;
  return useMemo(
    () => (
      <AccordionContentStyled>
        {expandAll ? (
          options.map((item, index) => (
            <Accordion flush key={index} defaultActiveKey={String(index)}>
              <Accordion.Item key={index} eventKey={String(index)}>
                <Accordion.Header>{item.name}</Accordion.Header>
                {/* <Accordion.Body>{item.children}</Accordion.Body> */}
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <Accordion flush>
            {options.map((item, index) => (
              <Accordion.Item key={index} eventKey={String(index)}>
                <Accordion.Header>{item.name}</Accordion.Header>
                {/* <Accordion.Body>{item.children}</Accordion.Body> */}
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </AccordionContentStyled>
    ),
    [expandAll, options]
  );
};

export default AccordionContent;

const AccordionContentStyled = styled.div`
  .accordion {
    .accordion-item {
      margin-top: 20px;
      border: 0px;
      font-size: 14px;
      .accordion-header {
        .accordion-button {
          padding: 0.5rem 1rem;
          font-weight: 700;
          font-size: 14px;
          &:focus {
            box-shadow: unset;
          }
          &:not(.collapsed) {
            box-shadow: unset;
          }
          &::after {
            width: 1rem;
            height: 1rem;
            background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.24652 7.14L0.450523 1.658C-0.115477 1.013 0.344523 3.67706e-07 1.20352 3.67706e-07H10.7955C10.9878 -0.000164459 11.176 0.0550878 11.3376 0.159141C11.4993 0.263194 11.6275 0.411637 11.707 0.586693C11.7864 0.761749 11.8137 0.955998 11.7856 1.14618C11.7575 1.33636 11.6752 1.51441 11.5485 1.659L6.75252 7.139C6.65866 7.24641 6.54291 7.3325 6.41303 7.39148C6.28316 7.45046 6.14217 7.48098 5.99952 7.48098C5.85688 7.48098 5.71589 7.45046 5.58601 7.39148C5.45614 7.3325 5.34038 7.24641 5.24652 7.139V7.14Z' fill='%23FF7300'/%3E%3C/svg%3E%0A");
          }
        }
      }
      .accordion-collapse {
        .accordion-body {
          padding: 1rem 1rem 0rem 1rem;
        }
      }
    }
  }
`;
