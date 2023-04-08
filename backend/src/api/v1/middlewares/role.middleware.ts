// import { NextFunction, Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import { User } from "../database/entity/user.entity";

// export const roleMiddleware = {
//   checkAdmin: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const jwtPayload = req.jwtPayload;

//       const user = await User.findOneBy({ id: Number(jwtPayload.sub) });

//       if (user) {
//         user.isAdmin
//           ? next(user)
//           : res.status(200).json({ message: "You dont have permission" });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },
// };
