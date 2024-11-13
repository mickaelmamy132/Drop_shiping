import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function DashboardCard({ title, value, icon: Icon, footer }){

  return(
    <Card className="mt-6 w-96">
    <CardBody>
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" color="blue-gray" className="font-medium">
          {title}
        </Typography>
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <Typography variant="h3" color="blue-gray" className="mb-2 font-bold">
        {value}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Typography className="text-sm text-gray-600">{footer}</Typography>
    </CardFooter>
  </Card>
  )
  
  }