import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "New order #0043.",
    icon: "bi bi-box",
    color: "success",
    date: "15 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "25 minute ago",
  },
  {
    title: "Report generated.",
    icon: "bi bi-file-earmark-text",
    color: "danger",
    date: "35 minute ago",
  },
  {
    title: "New order #0042.",
    icon: "bi bi-box",
    color: "success",
    date: "55 minute ago",
  },
  {
    title: "New ticket received.",
    icon: "bi bi-chat",
    color: "dark",
    date: "1 hours ago",
  },
  {
    title: "New feedback received.",
    icon: "bi bi-star",
    color: "warning",
    date: "2 hours ago",
  },
];

const DashboardFeeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Notifications</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          New Updates
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default DashboardFeeds;
