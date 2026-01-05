import sql from "../config/db.js";

// Fetch all creations of the authenticated user
export const getUserCreations = async (req, res) => {
    try {
      const { userId } = req.auth();
      // Logic to fetch user creations from the database
      const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
      return  res.status(200).json({ success: true, creations });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

// Fetch all published creations
export const getPublishedCreations = async (req, res) => {
    try {
        // Logic to fetch published creations from the database }
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
       return res.status(200).json({ success: true, creations });
    } 
       catch (error) {
  console.error("BACKEND ERROR");

  if (error.response) {
    console.error("STATUS:", error.response.status);
    console.error("DATA:", error.response.data?.toString());
  } else {
    console.error("MESSAGE:", error.message);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

    }   


// Toggle like/unlike a creation
export const toogleLikecreation = async (req, res) => {
    try {
       const {userId} = req.auth();
        // Logic to fetch published creations from the database
        const {id} =req.body;
       const [creations] = await sql `SELECT * FROM creations users WHERE id = ${id} `;
       if(!creations){
        return res.status(404).json({ success: false, message: "Creation not found" });
       }
       const currentLikes = creations.likes || 0;
       const userIdstr = userId.toString(); 
       let updatedLikes;;
       let message;
       if(currentLikes.includes(userIdstr)){
        updatedLikes = currentLikes.filter((user) => user !== userIdstr);
        message = "Creation unliked";
       }
         else{
        updatedLikes = [...currentLikes, userIdstr];
        message = "Creation liked";
       }
       const formattedArray= `{${updatedLikes.join(',')}}`;


        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

      return  res.status(200).json({ success: true, message });
    } catch (error) {
  console.error("BACKEND ERROR");

  if (error.response) {
    console.error("STATUS:", error.response.status);
    console.error("DATA:", error.response.data?.toString());
  } else {
    console.error("MESSAGE:", error.message);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

    }   
