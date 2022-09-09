import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let ticket = await prisma.ticket.findFirst();
  if (!ticket) {
    await prisma.ticket.create({
      data: {
        name: 'Presencial',
        price: 250,
        quantity: 300,
        hotelPrice: 350,
      },
    });

    await prisma.ticket.create({
      data: {
        name: 'Online',
        price: 100,
        quantity: 300,
        hotelPrice: 0,
      },
    });
  }
  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
      },
    });
    await prisma.hotel.create({
      data: {
        name: 'Driven Palace',
        image: 'https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg',
      },
    });
    await prisma.hotel.create({
      data: {
        name: 'Driven World',
        image:
          'https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg',
      },
    });

    function generateRooms(hotelId: number) {
      let min: number;
      let max: number;
      if (hotelId === 1) {
        min = 1;
        max = 3;
      } else if (hotelId === 2) {
        min = 1;
        max = 2;
      } else {
        min = 1;
        max = 1;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = hotel.id; i <= hotel.id + 2; i++) {
      for (let j = 1; j <= 4; j++) {
        for (let k = 1; k <= 4; k++) {
          await prisma.room.create({
            data: {
              number: Number(`${j}0${k}`),
              hotelId: i,
              beds: generateRooms(i),
            },
          });
        }
      }
    }
  }

  let activity = await prisma.activity.findFirst();
  if (!activity) {
    activity = await prisma.activity.create({
      data: {
        name: 'Minecraft: montando o PC ideal',
        place: 'Auditório Principal',
        vacancy: 27,
      },
    });
    await prisma.activity.create({
      data: {
        name: 'LoL: montando o PC ideal',
        place: 'Auditório Principal',
        vacancy: 1,
      },
    });
    await prisma.activity.create({
      data: {
        name: 'Palestra x',
        place: 'Auditório Lateral',
        vacancy: 27,
      },
    });
    await prisma.activity.create({
      data: {
        name: 'Palestra y',
        place: 'Sala de Workshop',
        vacancy: 27,
      },
    });
    await prisma.activity.create({
      data: {
        name: 'Palestra z',
        place: 'Sala de Workshop',
        vacancy: 1,
      },
    });

    for (let i = activity.id; i < activity.id + 3; i++) {
      let date: string;
      if (i === activity.id) date = 'Sexta, 22/10';
      else if (i === activity.id + 1) date = 'Sábado, 23/10';
      else date = 'Domingo, 24/10';

      await prisma.schedule.create({
        data: {
          date,
          activityId: activity.id,
          startTime: '09:00',
          endTime: '10:00',
        },
      });

      await prisma.schedule.create({
        data: {
          date,
          activityId: activity.id + 1,
          startTime: '10:00',
          endTime: '11:00',
        },
      });

      await prisma.schedule.create({
        data: {
          date,
          activityId: activity.id + 2,
          startTime: '09:00',
          endTime: '11:00',
        },
      });

      await prisma.schedule.create({
        data: {
          date,
          activityId: activity.id + 3,
          startTime: '09:00',
          endTime: '10:00',
        },
      });

      await prisma.schedule.create({
        data: {
          date,
          activityId: activity.id + 4,
          startTime: '10:00',
          endTime: '11:00',
        },
      });
    }

    await prisma.schedule.create({
      data: {
        date: 'Sexta, 22/10',
        activityId: activity.id + 4,
        startTime: '12:00',
        endTime: '13:30',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
