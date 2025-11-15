"use client";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface AmenityItem {
  icon: React.ElementType;
  text: string;
}

export default function AmenitiesList({ amenities }: { amenities: AmenityItem[] }) {
  return (
    <List disablePadding>
      {amenities.map((item, index) => (
        <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
}
