/* eslint-disable max-lines-per-function */
import { FilterQuery, PipelineStage } from "mongoose";

export const paginationPipeLine = <T extends Record<string, any>>({
  page = 1,
  limit = 10,
  filter,
}: {
  page: number;
  limit: number;
  filter: FilterQuery<T>;
}) => {
  const skip = (page - 1) * limit;

  return [
    {
      $match: {
        ...filter,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],
        data: [
          {
            $addFields: {
              _id: "$_id",
            },
          },
        ],
      },
    },
    {
      $unwind: "$total",
    },

    {
      $project: {
        items: {
          $slice: [
            "$data",
            skip,
            {
              $ifNull: [limit, "$total.count"],
            },
          ],
        },
        page: {
          $literal: skip / limit + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [limit, Number(page)] }, "$total.count"],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", limit],
          },
        },
        totalItems: "$total.count",
      },
    },
  ] as PipelineStage[]
};
