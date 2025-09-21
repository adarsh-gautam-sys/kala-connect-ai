import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Get posts by cluster for community forum
export const listByCluster = query({
  args: { cluster: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("community_posts")
      .withIndex("by_cluster", (q) => q.eq("cluster", args.cluster))
      .order("desc")
      .collect();

    // Get user info for each post
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        return {
          ...post,
          authorName: user?.name || "Anonymous",
        };
      })
    );

    return postsWithUsers;
  },
});

// Create a new community post
export const createPost = mutation({
  args: {
    body: v.string(),
    title: v.optional(v.string()),
    cluster: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("User must be authenticated");

    // Use provided cluster or default to user's region/skill
    const cluster = args.cluster || user.name?.split(" ")[0] || "general";

    const postId = await ctx.db.insert("community_posts", {
      userId: user._id,
      cluster,
      body: args.body,
      title: args.title,
    });

    return postId;
  },
});
