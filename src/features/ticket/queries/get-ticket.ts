import {prisma} from "@/lib/prisma";

const getTicket = async (id:string) => {
   return prisma.ticket.findUnique({
      where: {
         id,
      }
   });
}

export {getTicket}